import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from "firebase";
import moment from 'moment';
import './App.css';
import config from './config/config';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


firebase.initializeApp(config);
var database = firebase.database();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
	messages: [],
	newMessage: '',
	rooms: [],
	currentRoom: "Welcome Room",
	newRoom: ''
     };
     this.roomsRef = database.ref('rooms');
     this.messagesRef = database.ref('messages/' + this.state.currentRoom);
     this.handleMessageChange= this.handleMessageChange.bind(this);
     this.handleMessageSubmit= this.handleMessageSubmit.bind(this);
     this.handleChange= this.handleChange.bind(this);
     this.handleSubmit= this.handleSubmit.bind(this);
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
	const room = snapshot.val();
	console.log(room);
       	room.key = snapshot.key;
      	this.setState({ rooms: this.state.rooms.concat( room )})
     	this.selectCurrentRoom(room.key);
        console.log(this.state.currentRoom);
     });
     this.messagesRef.on('child_added', snapshot => {
	const message = snapshot.val();
       	message.key = snapshot.key;
       	this.setState({ messages: this.state.messages.concat( message ) })
     });
  }
   selectCurrentRoom(key){
     console.log(key);
     if (key === this.state.currentRoom) return;
     this.messagesRef.off();
     this.messagesRef = database.ref('messages/' + key);
     this.setState({currentRoom: key, messages: []});
     this.messagesRef.on('child_added', snapshot => {
	const message = snapshot.val();
       	message.key = snapshot.key;
       	this.setState({ messages: this.state.messages.concat( message ) })
     });
   }
   selectRoom(e){
     let key = e.target.getAttribute("mumbu");
     this.selectCurrentRoom(key);
   }
   handleMessageChange(event) {
     this.setState({newMessage: event.target.value});
   }

   handleMessageSubmit(event) {
     event.preventDefault();
     const time = moment().format('MMMM Do YYYY, h:mm a');
     console.log(time);
     if (this.state.newMessage !== ''){
       let message = {username: "Be",
		    content: this.state.newMessage,
		    sentAt: time
		   };
	var newPostKey = this.messagesRef.push(message).key;
	console.log(newPostKey);
     }
     this.setState({newMessage: ''});
   }

   handleChange(event) {
     this.setState({newRoom: event.target.value});
   }

   handleSubmit(event) {
     event.preventDefault();
     const newRoomName = this.state.newRoom;
     if(newRoomName !== ''){
       const roomKey = this.roomsRef.push({
    	  name: newRoomName
       }).key;
       this.setState({newRoom: ''
// 	  currentRoom: roomKey
       });
     }
   }
   
  render() {
    return (
      <div className="App">
	<h1>Bloc Chat</h1>
	<main>
	  <h1>{this.state.currentRoom}</h1>
	  <RoomList handleSubmit={this.handleSubmit} handleChange={this.handleChange} rooms={this.state.rooms} newRoom={this.state.newRoom} selectRoom={(e)=>this.selectRoom(e)} />
	  <MessageList handleSubmit={this.handleMessageSubmit} handleChange={this.handleMessageChange} newMessage={this.state.newMessage} user="Valorie" roomId={this.state.currentRoom} messages={this.state.messages}/>
	</main>
      </div>
    );
  }
}

export default App;
