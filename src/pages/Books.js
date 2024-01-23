
import { BrowserRouter, Navigate, Router, Link, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';



    const Books = () => {
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
            const sizeDivision = 14;   

                 data.forEach((v, i) => {
                if (i % sizeDivision === 0) {
                  divComponents.push([]);
                }
                divComponents[Math.floor(i / sizeDivision)] = [...divComponents[Math.floor(i / sizeDivision)], v];
              });


            
              const myComponent=()=>{
                return <div style={{ border: "1px solid red", display: "flex" }}>
                        
                    
                
                    {divComponents.map((column)=>{
                       return (
                       <div style={{ float: "left", width: "50%",border: "1px solid red"  }}> 
                           {column.map((w)=>{
                            return <Link to={{
                                pathname:`/version/${bibleId}/books/${w.id}/chapters`,
                                state:{version: w.name}
                            }} key={w.id}>{w.name}</Link>})}
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
            content=(
               
                <div
                  fontSize={[1, 3]}
                  letterSpacing={1}
                  width="100%"
                  textAlign="center"
                >
                  Available Books
                  {myComponent()}
                </div>
                
            )
        }



        return (
            <div>
                {content}
                
            </div>);
}
 
export default Books;
