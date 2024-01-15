import React,{useState, useContext} from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchUserData } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { authFailure } from '../redux/authSlice.js';
import { UserContext } from '../context/UserContext.js';


const MainWrapper=styled.div`
    padding-top:40px;
`;

export default function Dashboard(){
    const dispatch=useDispatch();
    const navigate = useNavigate(); 
    const { setUser } = useContext(UserContext);


    React.useEffect(()=>{        
            fetchUserData().then((response)=>{
                if(response.status===200){
                    setUser(response.data);
                }
                else{
                    dispatch(authFailure('Internal Error'))
                }
            }).catch((e)=>{
                console.log(e);

                localStorage.clear();
                navigate('/');
            })
    },[])


    return (
        <Container>
            <MainWrapper>
                <div>Dashboard</div> 
            </MainWrapper>
        </Container>       
    )
}