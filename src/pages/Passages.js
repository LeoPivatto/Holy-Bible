

import {useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import SideBar from './sidebar';
import { fetchPassagesData } from '../api/api'; 
import Toolsbar from '../components/toolsbar';
const api_key= process.env.REACT_APP_TRANSLATE_API_KEY



    const Passages = () => {
        const [data, setData]=useState([])
        const [error, setError]=useState(null)
        const [responsedata, setResponseData]= useState([])

        //params
        const {bibleId}= useParams()
        const {passagesId}=useParams()
    
        

        useEffect(() => {
        const fetchedData = async()=>{
            try{
                const response = await fetchPassagesData(bibleId, passagesId)
                setData(response)
                
                
            }
            catch(error) {
                setError(error)
            }}

        fetchedData()
        
    },[bibleId, passagesId])
        
   

    

        const listPassages=({content})=>{
            if(!content){
              return  <p>loading...</p>
            }
            return <div style={{}} dangerouslySetInnerHTML={{__html: content}} />
        }

        


        useEffect(()=>{
        const getMessages= async()=>{
            

                if (!data || !data.content) {
                    console.error("Data is empty or does not contain content");
                    return;
                }
                const options= {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message:`
                        make a summary of the passage, saying what the person that wrote is trying to say,
                        if its an event that happened give me where was being located, what should people undestand of it, what is saying to their hearts?
                        (if it has a couple of gramatical errors just ignore it ) ${data.content}` 

                    }),}

                try{
                    const response = await fetch("http://localhost:5000/completions",  options   )
                    const responseData= await response.json()
                    setResponseData(responseData )
                    console.log(responseData)
            } catch (error){
                console.error(error)
            }}

        if (data && data.content) {
            getMessages();
        }
  
    }, [data])

        

        






        //error handling 

        let content
        if(!data){
            content= <p>loading...</p>
        }else if(error){
            content= <p>something is wrong..</p>
        }else{
            
            content=(
                <>
                
                <Toolsbar/>
                  {listPassages(data)}
                
                
                
              </>
            )
        }



        return (
            <div>
                <Navbar style={{backgroundColor:"#975252"}}>
                    <div style={{fontSize:"1.5vw",}}>
                    <a style={{border:"none",
                        backgroundColor:"#975252", 
                    }} href='/'>📖 Bible</a>

                    </div>
                </Navbar>
                <div className='container'>
                


                <div className="col1">
                <SideBar/>
                </div>
                
                
                    <div className='col2'>{content}</div>
                    
                
                
                    <div className='col3'>
                    <p style={{fontWeight:"bold"}}>Summary of the chapter:</p>

                    {
                    responsedata && 
                    responsedata.choices && 
                    responsedata.choices[0] && 
                    responsedata.choices[0].message && 
                    
                    (<p>{responsedata.choices[0].message.content}</p>)

                    }
                    </div>
                    
                </div>

                
            </div>);
}
 
export default Passages;
