import express from 'express';
import fs from "fs";
import path from "path";
import OpenAI from "openai";


const app = express();
app.use(express.json());

const openai = new OpenAI({apiKey:"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"});

const speechFile = path.resolve("./speech.mp3");

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!",
  });


  console.log(speechFile)
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);










}
main();








const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
