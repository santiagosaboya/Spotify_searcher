import React, { useEffect, useState }from "react";
import styles from './SearchBar/style.css'
import { useLocation } from "react-router-dom";





function Pagina () {
    const[token, setToken] = useState('');
    const[refreshToken, setRefreshToken] = useState('')
    const[resultadosBusqueda, setResultadosBusqueda] = useState([])
    const[busqueda, setBusqueda] = useState('')
    const[playlist, setPlaylist] = useState([])
    const[topCanciones, setTopCanciones] = useState([])
    const id_cliente = '488e8046b07f4829bd36cfd5e7a4f9ff';
    const cliente_secreto = 'ab8f27cf7c68496e8b091aed8e31d443';
    const redirect_uri = 'http://localhost:3001/home'
    const location = useLocation();

    const commonParams = {
        client_id: id_cliente,
        redirect_uri: redirect_uri,
        client_secret: cliente_secreto
    };

    async function tokenRequest(codigo) {
        try {
            const params = new URLSearchParams();
                params.append("client_id", commonParams.client_id);
                params.append("client_secret", commonParams.client_secret);
                params.append("grant_type", "authorization_code");
                params.append("code", codigo);
                params.append("redirect_uri", commonParams.redirect_uri);

            const request = await fetch('https://accounts.spotify.com/api/token', {
                method:'POST',
                headers:{ 
                    'content-type': 'application/x-www-form-urlencoded',
                    // 'Authorization': 'NDg4ZTgwNDZiMDdmNDgyOWJkMzZjZmQ1ZTdhNGY5ZmY6YWI4ZjI3Y2Y3YzY4NDk2ZThiMDkxYWVkOGUzMWQ0NDM='
                },
                body: params
            })
            const resultados = await request.json();
            const tokencita = await resultados.access_token;
            const refreshTokencita = await resultados.refresh_token;
            setToken(tokencita);
            setRefreshToken(refreshTokencita);
            console.log(resultados)
        } catch (error) {
            console.log(error)
        }
    }

    async function refreshTokenRequest (refresh_token) {
        const head = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        const params = new URLSearchParams();
            params.append('grant_type', 'refresh_token');
            params.append('refresh_token', refresh_token);
            params.append('client_id', id_cliente);

        const request = await fetch('https://accounts.spotify.com/api/token', {
            method:'POST',
            headers: head,
            body: params
        })

        const resultados = await request.json();
        
        setToken(resultados.access_token)
        setRefreshToken(resultados.refresh_token)
    }




    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const spotifyCode = urlParams.get('code')
        tokenRequest(spotifyCode);

        const timer = setTimeout(refreshTokenRequest, 3500, refreshToken);
        setTimeout(refreshTokenRequest, 3400000, refreshToken);
        if(resultadosBusqueda === undefined) {
            refreshTokenRequest(refreshToken)
        }
        clearTimeout(timer);

    },[location.search])


    async function playlistRequest(){
        const resultados = await fetch(`https://api.spotify.com/v1/search?q=${busqueda}&type=album%2Ctrack%2Cartist`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const objetoResultado = await resultados.json();
        setResultadosBusqueda(objetoResultado.tracks.items)
        console.log(objetoResultado.tracks.items)
    };

    const handleInputChange = (e) => {
        const type = e.target.value;
        console.log(type)
        setBusqueda(type)
    };


    return(
        <div className="hp">
            <div className="nav">
                <h1>Recomendador de San</h1>
            </div>
            <div className="buscador">
                <h6>Busca tu cancion/ artista / album o podcast favorito!</h6>
                <div className="search-box">
                    <button className="btn-search" type="submit" onClick={playlistRequest}><i className="fas fa-search"></i></button>
                    <input type="text" className="input-search"  onChange={handleInputChange}/>
                </div>
            </div>
            <div className="resultados-container"><h4>Resultados</h4><h4>Tu nueva playlist</h4>
                <div className="resultados-de-busqueda">{resultadosBusqueda.length === 0 ? 'Busca algo' : resultadosBusqueda.map((t, index) => <div className={'canciones-container' + index}><div className="imagen-container"><img className="imagen" src={t.album.images[0].url}/></div><div className="texto-container"><h2>{t.name}</h2><p>{t.artists[0].name}</p></div><div className="boton-container"><button className={'boton-cancion1'} onClick={() => {const resultado = (<div className={'canciones-container' + index}><div className="imagen-container"><img className="imagen" src={t.album.images[0].url}/></div><div className="texto-container"><h2>{t.name}</h2><p>{t.artists[0].name}</p></div><div className="boton-container"><button className={'boton-cancion2'} onClick={() => {const array = playlist.filter(r => r !== resultado);setPlaylist(array)}}>Quitar</button></div></div>); setPlaylist([playlist, resultado])}}>Agregar</button></div></div>)}</div>
                <div className="playlist">{playlist}</div>
            </div>
        </div>
      );
}

export default Pagina  