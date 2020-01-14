import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Dashboard(){ 

    const [spots, setSpots] = useState([]);

    // [] - serve para ficar executando a funcao useEffect sempre que tiver
    // alguma alteracao na variavel declarada dentro do []
    useEffect(() =>{

        async function loadSpots(){



            const user_id = localStorage.getItem("user");
            const response = await api.get("/dashboard",{
                headers: { user_id }
            });

            setSpots(response.data);
        }

        setSpots([]);
        loadSpots();

    },[]);

    return (
        <>
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