


import { BrowserRouter, Navigate, Router, Link, useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';




    const Chapters = () => {
        const [data, setData]=useState([])
        const [error, setError]=useState(null)


        //params
        const {bibleId}= useParams()
        const {bookId}=useParams()
        

        useEffect(() => {
        const fetchedData = async()=>{
            try{
                const url=`https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`
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
        




        const listChapters=()=>{
            return data.map((value, index)=>{
                return(
                <Link 
                  to={`/version/${bibleId}/passages/${value.id}`}
                  key={index}>
                    {value.reference}
                </Link>)
                console.log(value)
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
                  Available Books
                </div>
                {listChapters()}
                
              </>
            )
        }



        return (
            <div>
                {content}
                
            </div>);
}
 
export default Chapters;
