import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import socketio from 'socket.io-client';
import { Link } from 'react-router-dom';
import config from '../../config/config';

import './styles.css';

export default function Dashboard(){ 

    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem("user");

    // userMemo - utilizar para memorizar o valor de uma variavel, assim ele não executa novamente sempre que houver alteração no componente
    // socketio - estabelecendo conexão com o socketio
    const socket = useMemo(() => socketio(config.Ip, {
        query: {user_id}
    }), [user_id]);

    // [] - serve para ficar executando a funcao useEffect sempre que tiver
    // alguma alteracao na variavel declarada dentro do []
    useEffect(() =>{
        socket.on('booking_request', data =>{
            setRequests([...requests, data]);
        });
    },[requests, socket]);

    useEffect(() =>{

        async function loadSpots(){
            const response = await api.get("/dashboard",{
                headers: { user_id }
            });

            setSpots(response.data);
        }

        setSpots([]);
        loadSpots();

    },[]);

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`).then(r => r.data);
    
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id){
        await api.post(`/bookings/${id}/rejections`).then(r => r.data);
        
        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
            <ul className = "notifications">
                {requests.map(request =>(
                    <li key = {request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong> 
                        </p>
                        <div>
                            <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                            <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                        </div>
                    </li>
                ))}

            </ul>
            <ul className="spot-list">
                {spots.map(spot =>(
                    
                    <li key={spot._id}>
                        <Link to={`/spot/${spot._id}`}>
                            <header style={{ backgroundImage: `url(${spot.thumbnail_url})`}}></header>
                            <strong>{spot.company} </strong>
                            <span>{spot.price ? `R$ ${spot.price}/dia` : " Gratuito"}</span>
                        </Link>
                    </li>
                    
                ))}
            </ul>
            <Link to="/spot">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    )

}