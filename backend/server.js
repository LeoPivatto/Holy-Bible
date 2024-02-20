
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from "cors"
const api_key= process.env.REACT_APP_TRANSLATE_API_KEY



const app = express();
app.use(cors());
app.use(express.json());



        app.post('/completions', async (req,res) =>{
          const {message} = req.body
          console.log(req.body)

          if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        
          const options= {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
               "Authorization": `Bearer ${api_key}`,

            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{ role: 'user', content: message }], })

            }

            
      
        try{
          const response= await fetch("https://api.openai.com/v1/chat/completions", options)
          const responseData = await response.json()
          
          return res.send(responseData )
          
        
        }catch (error){
          console.error(error)
          return res.status(500).json({ error: 'Internal server error' });
        }


        
      })








const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
