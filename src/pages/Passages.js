

import {useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import SideBar from './sidebar';
import { fetchPassagesData } from '../api/api'; 
import Toolsbar from '../components/toolsbar';

    const Passages = () => {
        const [data, setData]=useState([])
        const [error, setError]=useState(null)


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
            if(data.length === 0){
              return  <p>loading...</p>
            }
            return <div style={{}} dangerouslySetInnerHTML={{__html: content}} />
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
                
                <Toolsbar/>
                  {listPassages(data)}
                
                
                
              </>
            )
        }



        return (
            <div>
                <Navbar style={{backgroundColor:"#975252", padding:"5px 0"}}>

                    <a style={{border:"none",backgroundColor:"#975252",  display:"flex"}} href='/'>
                    <h1>Biblia Online</h1>
                    </a>

                    
                </Navbar>
                <div className='container'>
                


                <div className="col1">
                <SideBar/>
                </div>
                
                
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
 
export default Passages;
