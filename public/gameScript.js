// JavaScript code here
const socket = io('/tictactoe');

socket.on('connect', () => {
    console.log("Trying to connect to the game server");
});

const setButtonText = (text) => {
    const button = document.querySelector('.btn-success');
    button.textContent = text;
};

const setIsButtonDisabled = (value) => {
    const button = document.querySelector('.btn-success');
    button.disabled = value;
};

const setIsButtonVisible = (value) => {
    const button = document.querySelector('.btn-danger');
    button.style.display = value ? 'block' : 'none';
};

const setPlayerNames = (text) => {
    const playersDiv = document.querySelector('.players');
    playersDiv.textContent = text;
};

const setValidationMessage = (text) => {
    const validationDiv = document.querySelector('.validation-message');
    validationDiv.textContent = text;
};

const setTextColorForValidationText = (colorClass) => {
    const validationDiv = document.querySelector('.validation-message');
    validationDiv.className = colorClass;
};


// Assuming your form has an id attribute like 'joinForm'
const joinForm = document.getElementById('joinForm');
const joinButton = document.querySelector('.btn-success');
const leaveButton = document.querySelector('.btn-danger');

joinButton.addEventListener('click', (event) => {
    const name = document.getElementById('floatingInput').value;
    const roomId = document.getElementById('floatingPassword').value;
    if(name!="" && roomId!=""){
        event.preventDefault();
        setButtonText("Joining...");
        setIsButtonDisabled(true);
        socket.emit("joinGameWithId", roomId, name);
        console.log("Sent JoinGameWithId event");
    }
});

// This code will prevent the form from submitting when the join button is clicked
joinForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

// listening for the joinGameValidation event
socket.on('joinGameValidation', (message) => {
    console.log("joinGameValidation Message Recived");
    if (message === "OK") {
        setValidationMessage("You Are Live");
        setIsButtonDisabled(true);
        setButtonText("Joined");
        setIsButtonVisible(true);
        setTextColorForValidationText("validation-message fs-3 text-success")
    } else {
        setValidationMessage("Room Not Available , Try another Room ID");
        setIsButtonDisabled(false);
        setButtonText("Join Game");
        setTextColorForValidationText("validation-message fs-3 text-danger");
    }
});

leaveButton.addEventListener('click', () => {
    const roomId = document.getElementById('floatingPassword').value;
    const name = document.getElementById('floatingInput').value;
    socket.emit("leaveRoom", roomId, name);
});

socket.on('leaveRoomValidation', (message) => {
    if (message === 'left') {
        setIsButtonDisabled(false);
        setButtonText("Join Game");
        setIsButtonVisible(false);
        setPlayerNames("");
        setValidationMessage("");
    }
});

socket.on('playerNames', (playernames) => {
    setPlayerNames("Players : " + playernames);
});


// game logic
const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
const box5 = document.querySelector("#box5");
const box6 = document.querySelector("#box6");
const box7 = document.querySelector("#box7");
const box8 = document.querySelector("#box8");
const box9 = document.querySelector("#box9");
var turn =0;

box1.addEventListener('click',()=>{
    if(box1.innerText=="" && mode){
        var room = document.getElementById('floatingPassword').value;
        if(turn%2==0){
            box1.innerText='X';
            socket.emit('box1',room,'X');
            console.log("emiting box1 message"+room);
        }else{
            box1.innerText='O';
            socket.emit('box1',room,'O');
            console.log("emiting box1 message",room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box1',(message)=>{
    console.log("box 1 messge recived "+message);
    box1.innerText=message;
});

box2.addEventListener('click',()=>{
    var room = document.getElementById('floatingPassword').value;
    if(box2.innerText=="" && mode){
        if(turn%2==0){
            box2.innerText='X';
            socket.emit('box2',room,'X');
            console.log("emiting box2 message"+room);
        }else{
            box2.innerText='O';
            socket.emit('box2',room,'O');
            console.log("emiting box2 message"+room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box2',(message)=>{
    console.log("box 2 messge recived "+message);
    box2.innerText=message;
});

box3.addEventListener('click',()=>{
    var room = document.getElementById('floatingPassword').value;
    if(box3.innerText=="" && mode){
        if(turn%2==0){
            box3.innerText='X';
            socket.emit('box3',room,'X');
            console.log("emiting box3 message"+room);
        }else{
            box3.innerText='O';
            socket.emit('box3',room,'O');
            console.log("emiting box3 message"+room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box3',(message)=>{
    console.log("box 3 messge recived "+message);
    box3.innerText=message;
});

box4.addEventListener('click',()=>{
    var room = document.getElementById('floatingPassword').value;
    if(box4.innerText=="" && mode){
        if(turn%2==0){
            box4.innerText='X';
            socket.emit('box4',room,'X');
            console.log("emiting box4 message"+room);
        }else{
            box4.innerText='O';
            socket.emit('box4',room,'O');
            console.log("emiting box4 message"+room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box4',(message)=>{
    console.log("box 4 messge recived "+message);
    box4.innerText=message;
});

box5.addEventListener('click',()=>{
    var room = document.getElementById('floatingPassword').value;
    if(box5.innerText=="" && mode){
        if(turn%2==0){
            box5.innerText='X';
            socket.emit('box5',room,'X');
            console.log("emiting box5 message"+room);
        }else{
            box5.innerText='O';
            socket.emit('box5',room,'O');
            console.log("emiting box5 message"+room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box5',(message)=>{
    console.log("box 5 messge recived "+message);
    box5.innerText=message;
});

box6.addEventListener('click',()=>{
    var room = document.getElementById('floatingPassword').value;
    if(box6.innerText=="" && mode){
        if(turn%2==0){
            box6.innerText='X';
            socket.emit('box6',room,'X');
            console.log("emiting box6 message"+room);
        }else{
            box6.innerText='O';
            socket.emit('box6',room,'O');
            console.log("emiting box6 message"+room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box6',(message)=>{
    console.log("box 6 messge recived "+message);
    box6.innerText=message;
});

box7.addEventListener('click',()=>{
    var room = document.getElementById('floatingPassword').value;
    if(box7.innerText=="" && mode){
        if(turn%2==0){
            box7.innerText='X';
            socket.emit('box7',room,'X');
            console.log("emiting box7 message"+room);
        }else{
            box7.innerText='O';
            socket.emit('box7',room,'O');
            console.log("emiting box7 message"+room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box7',(message)=>{
    console.log("box 7 messge recived "+message);
    box7.innerText=message;
});

box8.addEventListener('click',()=>{
    var room = document.getElementById('floatingPassword').value;
    if(box8.innerText=="" && mode){
        if(turn%2==0){
            box8.innerText='X';
            socket.emit('box8',room,'X');
            console.log("emiting box8 message"+room);
        }else{
            box8.innerText='O';
            socket.emit('box8',room,'O');
            console.log("emiting box8 message"+room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box8',(message)=>{
    console.log("box 8 messge recived "+message);
    box8.innerText=message;
});

box9.addEventListener('click',()=>{
    var room = document.getElementById('floatingPassword').value;
    if(box9.innerText=="" && mode){
        if(turn%2==0){
            box9.innerText='X';
            socket.emit('box9',room,'X');
            console.log("emiting box9 message"+room);
        }else{
            box9.innerText='O';
            socket.emit('box9',room,'O');
            console.log("emiting box9 message"+room);
        }
        turn++;
        changeVSMG(turn);
    }
});
socket.on('box9',(message)=>{
    console.log("box 9 messge recived "+message);
    box9.innerText=message;
});


var mode = false;
const vmsg = document.querySelector("#v-msg");
vmsg.addEventListener('click',()=>{
    if(vmsg.innerText=="Tap To Start The Game"){
        mode=true;
        vmsg.innerText="player 1 turn";
    }
});

function changeVSMG(turn){
    if(winningCondition()){
        if(turn%2==0){
            vmsg.innerText="Match Won by player 2";
        }else{
            vmsg.innerText="Match Won player 1";
        }
        mode = false;
        return;
    }
    if(turn %2==0){
        vmsg.innerText="player 1 turn";
    }else{
        vmsg.innerText="player 2 turn";
    }
    if(turn ==9){
        vmsg.innerText = "Match Draw";
    }
}

function winningCondition() {
    console.log("winningCondition function initialized");
    // Horizontal checks
    if (box1.innerText.trim() === box2.innerText.trim() && box2.innerText.trim() === box3.innerText.trim() && box1.innerText.trim() !== "") {
        return true;
    } else if (box4.innerText.trim() === box5.innerText.trim() && box5.innerText.trim() === box6.innerText.trim() && box4.innerText.trim() !== "") {
        return true;
    } else if (box7.innerText.trim() === box8.innerText.trim() && box8.innerText.trim() === box9.innerText.trim() && box7.innerText.trim() !== "") {
        return true;
    }
    // Vertical checks
    if (box1.innerText.trim() === box4.innerText.trim() && box4.innerText.trim() === box7.innerText.trim() && box7.innerText.trim() !== "") {
        return true;
    } else if (box2.innerText.trim() === box5.innerText.trim() && box5.innerText.trim() === box8.innerText.trim() && box8.innerText.trim() !== "") {
        return true;
    } else if (box3.innerText.trim() === box6.innerText.trim() && box6.innerText.trim() === box9.innerText.trim() && box9.innerText.trim() !== "") {
        return true;
    }
    // Diagonal checks
    if (box1.innerText.trim() === box5.innerText.trim() && box5.innerText.trim() === box9.innerText.trim() && box1.innerText.trim() !== "") {
        return true;
    } else if (box3.innerText.trim() === box5.innerText.trim() && box5.innerText.trim() === box7.innerText.trim() && box3.innerText.trim() !== "") {
        return true;
    }
    return false;
}

