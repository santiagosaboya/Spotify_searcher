import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from './style.css'



const REACT_APP_SPOTIFY_CLIENT_ID = '';
const REACT_APP_SPOTIFY_CALLBACK_HOST = 'http://localhost:3001/home';
const REACT_APP_SPOTIFY_CLIENT_SECRET = '';

const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private`;



function Home() {


    const location = useLocation();
    const handleLogginClick = () => {
        window.location.replace(spotifyUrl)
    }
    return(
        <div className="todo">
            <div className="izquierda">
                <h1>El recomendador de San</h1>
                <p>Añade musica recomendada de spotify y crea playlists con esta herramienta!</p>
                <div className="button-container">
                    <button className="ingresar" onClick={handleLogginClick}>Ingresa</button>
                </div>
            </div>
            <div className="derecha"></div>
        </div>
    )
}

export default Home
