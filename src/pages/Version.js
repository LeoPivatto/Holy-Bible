
import { BrowserRouter, Navigate, Router, Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';




    const Version = () => {
        const [data, setData]=useState([])
        const [error, setError]=useState(null)


        useEffect(() => {
        const fetchedData = async()=>{
            try{
                const url="https://api.scripture.api.bible/v1/bibles"
                const response = await fetch(url,
                    {headers: { 'api-key': process.env.REACT_APP_API_KEY }})
                const result= await response.json()
                setData(result.data)
                
            }
            catch(error) {
                setError(error)
            }}

        fetchedData()
        
    },[])
        




        const listVersion=()=>{
            return data.map((value, index)=>{
               return (
                <Link 
                to={{
                    pathname:`/version/${value.id}`,
                    state:{version: value.name}
                }}
                key={index}>
                    {value.name}
                </Link>
                )
                
            })}



        //error handling 

        let content
        if(!data){
            content= <p>loading...</p>
        }else if(error){
            content= <p>something is wrong..</p>
        }else{
            content=(
                <>
                
                <div
                  fontSize={[1, 3]}
                  letterSpacing={1}
                  width="100%"
                  textAlign="center"
                >
                  Available Version
                </div>
                {listVersion()}
                
              </>
            )
        }



        return (
            <div>
             
            
                {content}
                
            </div>);
}
 
export default Version;
