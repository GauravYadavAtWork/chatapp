
const socket = io('/chatapp',{auth:{token:"hehe"}});

let errorMessageDisplayed=false;

socket.on('connect_error', error => {
    if (!errorMessageDisplayed) {
        displayErrorMessage("Error: " + error);
        errorMessageDisplayed = true;
    }
});

socket.on('connect',()=>{
    displayConfigMessage("Connected To The App");
    errorMessageDisplayed=false;
});
socket.on('disconnect',()=>{
    displayErrorMessage("Disconnected To The App");
});

socket.on('recive-message',(message)=>{
    displayRecivedMessage(message);
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const roomInput = document.getElementById('room-id');
const joinRoomButton=document.getElementById('join-room-button');
const username= document.getElementById('user-name').textContent;
var capitalizedUserName = username.charAt(0).toUpperCase() + username.slice(1);

function displaySendMessage(msg){
    const message = document.createElement('div');
    message.textContent = msg;
    message.classList.add('rightAlign');
    messages.appendChild(message);
}

function displayErrorMessage(msg){
    const message = document.createElement('div');
    message.textContent = msg;
    message.classList.add('centerErrorAlign');
    messages.appendChild(message);
}
function displayConfigMessage(msg){
    const message = document.createElement('div');
    message.textContent = msg;
    message.classList.add('centerAlign');
    messages.appendChild(message);
}
function displayRecivedMessage(msg){
    const message = document.createElement('div');
    message.textContent = msg;
    message.classList.add('leftAlign');
    messages.appendChild(message);
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value) {
        console.log(`room id : ${roomInput.value}`);
        displaySendMessage(input.value);
        socket.emit('send-Message',capitalizedUserName+" : "+input.value,roomInput.value);
        input.value = '';
    }
});


// joinRoomButton.addEventListener('click',()=>{
//     const room=roomInput.value;
//     socket.emit('join-room',room, msg=>{
//         console.log("call back fired");
//         displayConfigMessage(msg);
//     });
// });

setTimeout(() => {
    // alert(username);
    const room=roomInput.value;
    socket.emit('join-room',room, msg=>{
        console.log("call back fired");
        displayConfigMessage(msg);
    });
}, 100);


