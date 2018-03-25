import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
     super(props);
	console.log("In roomlist");
     this.state = {
	rooms: []
     };
     this.roomsRef = this.props.firebase.ref('rooms');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
	const room = snapshot.val();
       	room.key = snapshot.key;
       	this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }

  render(){
    return (
      <section>
	<h2>Rooms</h2>
	{this.state.rooms.map((room,index) => 
	  <div key={index}>{room.name}</div>)
	}
	<p>Choose your facvorite</p>
      </section>
    );
  }
}

export default RoomList;
