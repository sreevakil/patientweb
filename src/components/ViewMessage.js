import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { getConversations, postResponse } from '../api/api';
import { Alert } from 'react-bootstrap';

export default function ViewMessage() {

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState('');
    const [conversation, setConversation] = useState({
        id: '',
        sender: '',
        dialog: '',
        message: ''
    });


    useEffect(() => {
        const fetchInterval = setInterval(() => {
            getConversations().then((response)=>{
            if(response.status===200){    
                setConversation(response.data);
            }
            else{    
                setError('Internal Error');
            }
        }).catch((e)=>{
            console.log(e);
        })}, 30000);
    
        return () => {
            clearInterval(fetchInterval);
        };
    }, []);


    const handleSubmit=(evt)=>{
        evt.preventDefault();
        postResponse(conversation).then((response)=>{    
            if(response.status===200){    
                setError("Response sent.");
            }
            else{    
                setError("Internal Error");
            }
        }).catch((err)=>{    
            if(err && err.response){            
                switch(err.response.status){    
                    case 401:

                        setError("Response Post Failed.Bad Credentials");
                        break;
                    default:

                        setError("Internal Error");
                    }
            }
            else{    
                setError("Internal Error");
            }
        });        
    }


    const handleChange = (e) => {
        setConversation((prev) => {            
            let helper = {...prev};
            helper[`${e.target.id}`] = e.target.value;
            return helper;
        })
    };

  return (
    <div className='container form-outline w-50'>
        <form onSubmit={handleSubmit} noValidate={false}>
            <input type="hidden" className="form-control" id="id" value={conversation.id}/>
            <input type="hidden" className="form-control" id="sender" value={conversation.sender}/>


            <div className="py-4 text-start">
                <label htmlFor="receiver" className="form-label">Conversation</label>
                <textarea className="form-control" id="dialog" rows="10" value={conversation.dialog} disabled={true}/>
            </div>
            <div className="py-4 text-start">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="3" value={conversation.message} onChange={handleChange}  required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
        <div>
            {error &&
                <Alert style={{marginTop:'20px'}} variant="danger">{error}</Alert>
            }
            </div>        
    </div>
  )
}