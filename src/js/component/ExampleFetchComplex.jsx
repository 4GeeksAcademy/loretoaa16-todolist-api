import React, { useEffect, useState } from "react";

export const ExampleFetchComplex = () => {
    const [ characters, setCharacters] = useState ([])
   const base_url = 'https://swapi.tech/api';
   
    //Eta funcion va a contener algunas instrucciones que demoran en resolverse
    //por eso la defino como asincrona
    const getCharacters = async () => {
        //vamos a realizar un GET de los users
        // 1. defino la uri (string)del fetch()
        const uri = `${base_url}/people`;
        // 2. defino las options(objeto) del fetch()
        const options = {
                method: 'GET' 
            }
        // 3. ejecuto el fetch() con los dos parametros y lo asigno a una constante
        //cuidado que instruccion demora
        const response = await fetch(uri, options)
        //4. verifico si el response me responde ok
        console.log(response)
        if (!response.ok) {
            //Trato el error
            console.log('Error', response.status, response.statusText)
            return //MUY IMPORTANTE
        }
        //5. Recupero los datos json del body, y lo espero
         const data = await response.json()

         console.log(data);
         //6. ejecuto mi lógica
        setCharacters(data.results)
        }  


       useEffect(() => {
            getCharacters();
       }, [])

       return (
            <div className="container">
                    <h1 className="tex-center">Example Fetch Complex </h1>
                    <ul className="list-group">
                        {characters.map((iterator) => 
                        <li key={iterator.uid} className="list-group-item">{iterator.name}</li>)}
                    </ul>
            </div>
       )
    }
