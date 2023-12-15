
import { BrowserRouter, Navigate, Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Books from './pages/Books';
import useFetch from './hooks/useFetch';

function App() {


  const url= "https://api.scripture.api.bible/v1/bibles" 

  const [dataa, setData]= useState([])

  const getData = async()=>{
    
    const response = await fetch(url,
      {headers: { 'api-key': 'a1550530e8fa50c175d8f76c98cc3490' }})
    const data = await response.json()
    
     setData(data.data)
    console.log(data.data)

}





useEffect(()=>{
  getData()
},[])





  return(
    <div className="App">
    <h1 style={{ color: "#975252" }}>Bible version</h1>
    <center style={{
             
            
              
              
            }}>
      {dataa.map((result, index) => {
        return (
          <div
            style={{
              width: "40vw",
              backgroundColor: "#111111 ",
              padding: 2,
              borderRadius: 10,
              marginBlock: 10,
              
            }}
          >
            <p style={{ fontSize: 20, color: 'white' }}>{result.name}</p>
          </div>
        );
      })}
    </center>
  </div>

)}

export default App;