

import { BrowserRouter, Navigate, Router, Link, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';





const SideBar= ()=>{
    

        const [data, setData]=useState([])
        const [error, setError]=useState(null)


        //params
        const {bibleId}= useParams()

        

        useEffect(() => {
        const fetchedData = async()=>{
            try{
                const url=`https://api.scripture.api.bible/v1/bibles/${bibleId}/books`
                const response = await fetch(url,
                    {headers: { 'api-key': process.env.REACT_APP_API_KEY }})
                const result= await response.json()
                setData(result.data)
                console.log(result.data)
            }
            catch(error) {
                setError(error)
            }}

        fetchedData()
        
    },[])
        


     
            // divComponents will hold subarrays of the content, each subarray 
            //will contain the sizedivision number of elements
            const divComponents = [];
            const sizeDivision = 100;   

                 data.forEach((v, i) => {
                if (i % sizeDivision === 0) { 
                  divComponents.push([]);
                }
                divComponents[Math.floor(i / sizeDivision)] = [...divComponents[Math.floor(i / sizeDivision)], v];
              });


            
              const sidebar=()=>{
                return <div style={{ }}>
                        
                    
                
                    {divComponents.map((column)=>{
                       return (
                       <div style={{  }}> 
                           {column.map((w)=>{
                            return <Link to={{
                                pathname:`/version/${bibleId}/books/${w.id}/chapters`,
                                state:{version: w.name}
                            }} 
                            style={{
                                display:"flex",
                                padding: "6px 12px"
                            }}
                            
                            key={w.id}>{w.name}</Link>})}
                        </div>)
                    })}
                    
                    
                    </div>
           }




        //error handling 

        let content

        if(!data.length === 0){

            content= <p>loading...</p>
        }else if(error){
            content= <p>something is wrong..</p>
        }else{
            content=sidebar();
        }




    return content
}


export default SideBar;