

import { BrowserRouter, Navigate, Router, Link, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';




    const Passages = () => {
        const [data, setData]=useState([])
        const [error, setError]=useState(null)


        //params
        const {bibleId}= useParams()
        const {passagesId}=useParams()
    
        

        useEffect(() => {
        const fetchedData = async()=>{
            try{
                const url=`https://api.scripture.api.bible/v1/bibles/${bibleId}/passages/${passagesId}`
                const response = await fetch(url,
                    {headers: { 'api-key': process.env.REACT_APP_API_KEY }})
                const result= await response.json()
                
                setData(result.data)
                console.log(data.value)

                

                
            }
            catch(error) {
                setError(error)
            }}

        fetchedData()
        
    },[bibleId, passagesId])
        




        const listPassages=({content})=>{
            if(data.length === 0){
              return  <p>loading...</p>
            }
            return <div dangerouslySetInnerHTML={{__html: content}} />
        }



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
                  Available Passages
                </div>
                {listPassages(data)}
                
              </>
            )
        }



        return (
            <div>
                {content}
                
            </div>);
}
 
export default Passages;
