import React, { useEffect, useState } from "react";

export const ExampleFetch = () => {
    const [ users, setUsers ] = useState([
        {name: 'connor'}, 
        {name: 'mauro'}])
    const host = 'https://jsonplaceholder.typicode.com';
    //Eta funcion va a contener algunas instrucciones que demoran en resolverse
    //por eso la defino como asincrona
    const getUsers = async () => {
        //vamos a realizar un GET de los users
        // 1. defino la uri (string)del fetch()
        const uri = `${host}/users`;
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
            return
        }
        //5. Extraigo los datos json del response,
        //cuidado que esto demora!
         const data = await response.json()
         console.log(data);

         //6. realizo la lógica de la funcion
        setUsers(data)
        }  


       useEffect(() => {
            getUsers();
       }, [])

       return (
            <div className="container">
                    <h1 className="tex-center">Example fetch</h1>
                    <ul className="list-group">
                        {users.map((iterator, index) => 
                            <li key={index} className="list-group-item">{iterator.name}</li>)}
                    </ul>
            </div>
       )
    }
