

import { BrowserRouter, Navigate, Router, Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Box from '../components/box';
import Navbar from '../components/navbar';




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

    let content
    if(!data){
        content= <p>loading...</p>
    }else if(error){
        content= <p>something is wrong..</p>
    }else{

            const divComponents = [];
            const sizeDivision = 129;   



                 data.forEach((v, i) => {
                if (i % sizeDivision === 0) {
                  divComponents.push([]);
                }
                divComponents[Math.floor(i / sizeDivision)] = [...divComponents[Math.floor(i / sizeDivision)], v];
              })
            




        content=(
                 <div style={{ display: "flex" }}>
                    {divComponents.map((column)=>{
                       return (
                       <div style={{ float: "left", width: "50%"  }}> 
                           {column.map((w)=>{
                            return <Link to={{
                                pathname:`/version/${w.id}`,
                                state:{version: w.name}
                            }} 
                            style={{width:"100%", display:"flex",alignItems:"center", height:"30px" }}
                            key={w.id}>{w.name}</Link>})}
                        </div>)
                    })}
                </div>
 
        )}
        

        return (
            <div>

                <Navbar style={{backgroundColor:"#975252"}}>
                    <h1>Biblia Online</h1>
                </Navbar>
                <div className='container'>
                <div className="col0"></div>
                <div className='col2'>{content}</div>
                    
                
                
                <div className='col3'>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                <p>Some very lenghy content</p>
                </div>
                </div>

                
            </div>);
}
 
export default Version;


