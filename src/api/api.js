import axios from 'axios';


const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const patientLogin=(credentials)=>{
    return axios({
        'method':'POST',
        'url':'http://localhost:8080/login',
        'data':credentials
    })
}

export const fetchUserData=()=>{
    return axios({
        method:'GET',
        url:'http://localhost:8080/userinfo',
        headers:{
            'Authorization':'Bearer '+ getToken()
        }
    })
}

export const postNewChat=(chat)=>{
    return axios({
        'method':'POST',
        'url':'http://localhost:8080/conversations',
        'data':chat,
        headers:{
            'Authorization':'Bearer '+ getToken()
        }
    })
}

export const getConversations=()=>{
    return axios({
        'method':'GET',
        'url':'http://localhost:8080/conversations',
        headers:{
            'Authorization':'Bearer '+ getToken()
        }
    })
}

export const postResponse=(conversation)=>{
    return axios({
        'method':'POST',
        'url':'http://localhost:8080/conversation/' + conversation.id + '/messages',
        'data':
            {
                'message': conversation.message,
                'receiver': conversation.sender
            },
        headers:{
            'Authorization':'Bearer '+ getToken()
        }
    })
}