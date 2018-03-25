import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from "firebase";
import './App.css';
import config from './config/config';
import RoomList from './components/RoomList';


firebase.initializeApp(config);
var database = firebase.database();
var starCountRef = database.ref('rooms');
console.log(starCountRef !== null);
starCountRef.on('value', function(snapshot) {
  console.log(snapshot.val());
  console.log("cehck snapshot");
});
console.log("hello");
console.log(database.ref('rooms').child("2"));
class App extends Component {
  render() {
    return (
      <div className="App">
	<h1>Bloc Chat</h1>
	<main>
	  <Route exact path="/" component={() => (<RoomList firebase={database} />)}/>
	</main>
      </div>
    );
  }
}

export default App;
