import React from 'react'

const Books = () => {

    const fetchedData= fetch("https://api.scripture.api.bible/v1/bibles/${bibleId}/books")


    












  return (
    <div>{fetchedData}</div>
  )
}

export default Books