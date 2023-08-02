const socket = io();

let username = '';
document.getElementById('join-btn').addEventListener('click', (event)=>{
    event.preventDefault();

    username = document.getElementById('username-input').value;
    // console.log(username);
    if(username.trim() !== ''){
        // document.querySelector('.form-username').style.display = 'none';
        document.querySelector('#front').style.display = 'none';
        document.querySelector('.chat-room-container').style.display = 'block';
    }
    document.getElementById('orinalname').innerHTML= `${username}`;
});



document.getElementById('send-button').addEventListener('click', (event)=>{
    event.preventDefault();
    const data = {
        username : username,
        message : document.getElementById('message-input').value
    }

    

    //if io is emitting anything only socket can listen
    //if my ssocket is emitting  anything only io can listen it
    //sending message to io

    if(data.message !== ''){

        socket.emit('message', data);
    }


    //what ever message i am sending i need to show this on ui for users

    if(data.message !== ''){

        addMessage(data);
    }else{
        console.log("Empty message")
    }

});

//receiving the message
socket.on('message',(data)=>{
    //before this msg io 
    if(data.username !== username){

        addMessagefnReceving(data);
    }
})

//working for sent messages
function addMessage(data){
    var msgDiv = document.createElement('div');
    // msgDiv.innerText = `${data.username} </br> ${data.message}`;
    msgDiv.innerHTML = `
                        <div>
                       
                            <h5 class="username_styling"><span>${data.username}</span><i class="fa-solid fa-caret-left icon_position__username"></i></h5>
                        </div>
                        <div>
                        <p>${data.message}</p>
                        </div>`;
    msgDiv.setAttribute('class', 'message sent msg_sent');
    document.getElementById('message-container').append(msgDiv);
    document.getElementById('message-input').value = '';
}

//working for receive messages
function addMessagefnReceving(data){
    var msgDiv = document.createElement('div');
    // msgDiv.innerHTML = `${data.username}:<br> ${data.message}`;
    msgDiv.innerHTML = `
    <div>
        
        <h5 class="username_styling"> <i class="fa-solid fa-caret-right icon_position__username"></i>${data.username}</h5>
    </div>
    <div>
    <p>${data.message}</p>
    </div>`;
    msgDiv.setAttribute('class', 'message received');
    document.getElementById('message-container').append(msgDiv);
    document.getElementById('message-input').value = '';
}