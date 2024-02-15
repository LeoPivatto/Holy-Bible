

import { useParams} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchPassagesData } from '../api/api'; 


    const Toolsbar = () => {
        const [data, setData]=useState([])
        const [error, setError]=useState(null)
        //params
        const {bibleId}= useParams()
        const {passagesId}=useParams()
        const [fetchedData, setFetchedData]= useState("");
        const [speechData, setSpeechData] = useState(null);
        
        

        useEffect(() => {
        const fetchedData = async()=>{
            try{
                const response = await fetchPassagesData(bibleId, passagesId)
                setData(response.data)
                setFetchedData(response.content)
                console.log(response)
            }
            catch(error) {
                setError(error)
            }}

        fetchedData()

        console.log(fetchPassagesData)
        
        
    },[bibleId, passagesId])
    
    
    
  const speak= () =>{
    if(window.speechSynthesis.speaking){
      console.log("already speakinggggggg")}
      
    // speech function
    if(fetchedData !== ""){
     const speechData= new SpeechSynthesisUtterance(fetchedData)
    

    // speak end
    speechData.onend = (event)=>{
      console.log(`utterance has finished being spoken after ${event.elapsedTime}`)
    }

    // speak error 
    speechData.onerror= (event)=>{
      console.error("something went wrong")
    }


    window.speechSynthesis.speak(speechData);

    setSpeechData(speechData);
    }
  }
  
    const handleSpeak= (event)=>{
        event.preventDefault();
        speak()
    
      }
    
      const handleResume= ()=>{
        speechSynthesis.resume()
    
      }
    
      const handleStop=()=>{
        speechSynthesis.pause()
      }





        return (
            <div className='toolsbar' style={{backgroundColor:"#1B1817", padding:"5px", border:"2px solid #212121"}} >
                <form>
                    <div className='audioplayer'>
                        <button style={{backgroundColor:"#1B1717", color:"white", border:"1px solid #212121", margin:"10px", padding:"10px", cursor:"pointer"}} onClick={handleSpeak}>Speak</button>
                        <button style={{backgroundColor:"#1B1717", color:"white", border:"1px solid #212121", margin:"10px", padding:"10px", cursor:"pointer"}} onClick={handleResume}>Resume</button>
                        <button style={{backgroundColor:"#1B1717", color:"white", border:"1px solid #212121", margin:"10px", padding:"10px", cursor:"pointer"}} onClick={handleStop}>Stop</button>
                    </div>
                </form>


            </div>);
}
 
export default Toolsbar;
