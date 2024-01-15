import React,{useState, useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserContext } from '../context/UserContext';

export default function Navbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, setUser} = useContext(UserContext);

  const logOut=()=>{
    localStorage.clear();
    setUser({});
    navigate('/');
  }

  const handleNewMessage=()=>{
    navigate("new-message");
  };

  const handleViewMessage=()=>{
    navigate("view-message");
  };

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Patient Dashboard</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {user != null && (Object.keys(user).length != 0)
?
                  <div>                  
                    <button className='btn btn-outline-light' onClick={()=>handleNewMessage()}>New Message</button>
                    <button className='btn btn-outline-light' onClick={()=>handleViewMessage()}>View Messages</button>
                    <button className='btn btn-outline-light' onClick={()=>logOut()}>Logout ({user.firstName})</button>
                  </div>
                  :null}
            </div>
        </nav>
    </div>
  )
}