import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){

    const [email, setEmail] = useState(''); 

    async function handleSubmit(event){
        event.preventDefault();
      
        let _id = null;
        await api.post('/sessions', { email })
                .then(r => {
                        _id = r.data._id;
                });

        localStorage.setItem('user', _id);
        history.push("/dashboard");
    }

    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit = {handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input 
                    type="email" id="email"
                    value = {email}
                    placeholder="Seu melhor e-mail" onChange={e => setEmail(e.target.value)}/>

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    );
}