import { createGlobalStyle } from "styled-components";

export const TemplateGlobal= createGlobalStyle`
    *, body {
        margin: 0;
        padding: 0;
    }

    body{
        background-color: #D9D9D9;
        color:#F4F4F4;
        display: table;
        width: 100%;
        height: 100%;
    }

    a{
        color: #F4F4F4;
        font-family: sans-serif;
        margin: 5px;
    }
    h1{
        font-size: 3vh;
        font-weight: bold;
        font-family: sans-serif;
        color: #F4F4F4;
        text-decoration: none;
    }
    

    .col1{
        width: 15%;
        height: 100vh;
        float: left;
        border-collapse: collapse;
        background-color:#1B1717;
        overflow-x: hidden;
        overflow-y: auto;
        margin:0 10vh 0 0 ;
        padding: 3vh;
        border-radius:2vw;
        
    }
    .col2{
        background-color:#1B1717;
        border-radius:2vw;
        width: 48% !important;
        height: 90vh;
        float: left;
        overflow-x: hidden;
        overflow-y: scroll;
        margin:10vh 0 0 0 ;
        padding: 7vh 4vw;
        
    }
    
    .col3{
        width: 23%;
        height: 50vh;
        position: relative;
        float: right;
        background-color:#1B1717;
        border-collapse: collapse;
        overflow-x: hidden;
        overflow-y: scroll;
        margin:0 2vw 0 10vh ;
        padding: 2vh;
        border-radius:2vw;
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
}
    
    

`