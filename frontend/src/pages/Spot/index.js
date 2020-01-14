import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api'

import './styles.css';
import camera from '../../assets/camera.svg';

export default function New({ history }){
    
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnail_url, setThumbnailUrl] = useState(null);
    const spot_id = history.location.pathname !== "/spot" ? history.location.pathname.substr(6, history.location.pathname.lenght) : null
    const user_id = localStorage.getItem("user");
    
    useEffect(() =>{
        if(spot_id){
            getSpot(spot_id).then(spot => {
                setCompany(spot.company);
                setTechs(spot.techs);
                setPrice(spot.price);
                setThumbnail(spot.thumbnail);
                setThumbnailUrl(spot.thumbnail_url);
            });  
        }
    },[spot_id]);

    // useMemo - recria o componente sempre que tiver uma alteracao em uma variavel e faz alteracao em outra variavel
    const preview = useMemo(() => {
        if(typeof(thumbnail) === "string")
            return thumbnail_url;
        else
            return thumbnail ? URL.createObjectURL(thumbnail) : null;   
    },
    [thumbnail, thumbnail_url]);


    async function getSpot(id){
        return await api.get(`/spots/${id}`).then(r => r.data);
    }

    async function handleDelete(id){
        await api.delete(`/spots/${id}`,{headers: {user_id}}).then(r => { history.push('/dashboard') });
    }

    async function handleSubmit(event){

        event.preventDefault();

        const data = new FormData();

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        if(!spot_id)
            await api.post('/spots', data, {headers: {user_id}}).then(r => { history.push('/dashboard')});
        else
            await api.post(`/spots/${spot_id}`, data, {headers: {user_id}}).then(r => { history.push('/dashboard')});

        
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style = {{ backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ""}>
                <input type="file" onChange= {event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select imagem"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company"
                placeholder = "Sua empresa incrivel"
                value = {company}
                onChange = {event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input
                id="techs"
                placeholder = "Suas tecnologias"
                value = {techs}
                onChange = {event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input
                id="price"
                placeholder = "Valor cobrado por dia"
                value = {price}
                onChange = {event => setPrice(event.target.value)}
            />

            <button 
            type="submit" 
            className="btn">
                Salvar
            </button>
            <button 
            type="button" 
            className="btn" 
            id="deletar" 
            style={{display: spot_id ? 'block' : 'none' }}
            onClick={() => handleDelete(spot_id)}>
                Deletar
            </button>
        </form>
    )
}