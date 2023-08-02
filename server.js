//import express
const express = require('express');

// make an express app
const app  = express();

//making server using http and server
const server = require('http').Server(app);

app.use(express.static('public'));

//integerating server with socket io
const io = require('socket.io')(server);

//server will be having io
io.on('connection', (socket)=>{
    console.log("connection established", socket.id); 

    //socketA -> io -> socketB
    //socketA user is triggered a message event
    socket.on('message',(data)=>{ //user is sending message
        io.emit('message', data); // emitting this megssage to all other users
    });
    socket.on('disconnect',()=>{
        console.log(socket.id, '->left the chat');
    });
});

const PORT = 9000;


server.listen(PORT, ()=>{
    console.log(`server is running on Port ${PORT}`);
    
});

//socket is giving data to io
//io is emitting data
//all others socket will catch the data
