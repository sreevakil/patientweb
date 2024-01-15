import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {patientLogin} from '../api/api.js';
import {Alert} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authenticate, authSuccess, authFailure } from '../redux/authSlice.js';


export default function Login() {    
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    
    const handleSubmit=(evt)=>{
        evt.preventDefault();

        setLoading(true);
        patientLogin(credentials).then((response)=>{
            if(response.status===200){

                dispatch(authSuccess(response.data));
                navigate('/dashboard')
            }
            else{

                setError('Internal Error');
            }
        }).catch((err)=>{
            if(err && err.response){            
                switch(err.response.status){

                    case 401:

                        setError("Authentication Failed.Bad Credentials");
                        break;
                    default:

                        setError('Internal Error');
                    }
            }
            else{
                setError('Internal Error');
            }
        });        
    }

    const handleChange = (e) => {
        e.persist();
        setCredentials(credentials => ({
            ...credentials,
            [e.target.name]: e.target.value
        }));
    };
    

    return (
        <div className='container form-outline w-25'>
            <form onSubmit={handleSubmit} noValidate={false}>
                <div>
                    <h4>Login</h4>
                </div>
                <div className='py-4'>
                    <input id="error" className="form-control border-0" type="text" readOnly/>
                </div>
                <div className="py-4 text-start">
                    <label htmlFor="username" className="form-label fw-bold">Username</label>
                    <input type="text" className="form-control" id="username" value={credentials.username} onChange={handleChange} name="username" required/>
                </div>
                <div className="py-4 text-start">
                    <label htmlFor="password" className="form-label fw-bold">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={handleChange} name="password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div>
            {error &&
                <Alert style={{marginTop:'20px'}} variant="danger">{error}</Alert>
            }
            </div>
        </div>
    )
}