import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { postNewChat } from '../api/api';
import { UserContext } from '../context/UserContext';
import {Alert} from 'react-bootstrap';


export default function NewMessage() {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);
    const [error, setError] = useState('');
    const [chat, setChat] = useState({
        receiver: "",
        message: ""
    })
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (user == null || (Object.keys(user).length === 0)) {
            navigate("/");
        }
      }, []);

    const handleChatChange = (e) => {
        setChat((prev) => {
            let helper = {...prev};
            helper[`${e.target.id}`] = e.target.value;
            return helper;
        })
    };


    const handleSubmit=(evt)=>{
        evt.preventDefault();
        postNewChat(chat).then((response)=>{
            if(response.status===200){
                setError('Message Sent');
            }
            else{
                setError("Internal Error");
            }
        }).catch((err)=>{
            if(err && err.response){            
                switch(err.response.status){
                    case 401:

                        setError("Authentication Failed.Bad Credentials");
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


  return (
    <div className='container form-outline w-50'>
        <form onSubmit={handleSubmit} noValidate={false}>
            <div className="py-4 text-start">
                <label htmlFor="receiver" className="form-label">Recipient</label>
                <input type="text" className="form-control" id="receiver" value={chat.receiver} onChange={handleChatChange}  aria-describedby="receiverHelp" required/>
                <div id="receiverHelp" className="form-text">Enter provider name.</div>
            </div>
            <div className="py-4 text-start">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="3" value={chat.message} onChange={handleChatChange}  required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div>
            {error &&
                <Alert style={{marginTop:'20px'}} variant="danger">{error}</Alert>
            }
            </div>        
    </div>
  )
}