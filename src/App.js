
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Books from './pages/Books';
import Version from './pages/Version';
import Chapters from "./pages/Chapters"
import Passages from "./pages/Passages"

function App() {
    return(

      <div>
      
      <Routes>

      
      <Route 
        exact
        path='/' 
        element={<Version/>}/>
     
      <Route 
        path='/version/:bibleId'
        element={<Books/>}/>
        
      <Route 
        path='/version/:bibleId/books/:bookId/chapters'
        element={<Chapters/>}/>

      <Route 
        path='/version/:bibleId/passages/:passagesId'
        element={<Passages/>}/>
    
      </Routes>
  
      

    </div>
    
    )
    
  
  
}

export default App;