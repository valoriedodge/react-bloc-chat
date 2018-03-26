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
	rooms: [],
	currentRoom: "Welcome Room",
	newRoom: ''
     };
     this.roomsRef = database.ref('rooms');
     this.handleChange= this.handleChange.bind(this);
     this.handleSubmit= this.handleSubmit.bind(this);
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
	const room = snapshot.val();
	console.log(room);
       	room.key = snapshot.key;
      	this.setState({ rooms: this.state.rooms.concat( room ), currentRoom: room.key})
     	console.log(this.state.currentRoom);
     });
  }
   selectCurrentRoom(key){
     console.log(key);
     this.setState({currentRoom: key});
   }
   selectRoom(e){
     let key = e.target.getAttribute("mumbu");
     this.selectCurrentRoom(key);
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
	  <MessageList user="Valorie" roomId={this.state.currentRoom} firebase={database}/>
	</main>
      </div>
    );
  }
}

export default App;
