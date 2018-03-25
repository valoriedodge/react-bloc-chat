import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
     super(props);
	console.log("In roomlist");
     this.state = {
	rooms: [],
	newRoom: ''
     };
     this.roomsRef = this.props.firebase.ref('rooms');
     this.handleChange= this.handleChange.bind(this);
     this.handleSubmit= this.handleSubmit.bind(this);
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
	const room = snapshot.val();
       	room.key = snapshot.key;
       	this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }
   handleChange(event) {
     this.setState({newRoom: event.target.value});
   }

   handleSubmit(event) {
     event.preventDefault();
     const newRoomName = this.state.newRoom;
     this.roomsRef.push({
  	name: newRoomName
     });
     this.setState({newRoom: ''});
   }

  render(){
    return (
      <section>
	<h2>Rooms</h2>
	{this.state.rooms.map((room,index) => 
	  <div key={index}>{room.name}</div>)
	}
	<form onSubmit={this.handleSubmit}>
	  <input type="text" value={this.state.newRoom} onChange={this.handleChange}/>
	  <input type="submit" value="Create New Room"/>
      	</form>
	</section>
    );
  }
}

export default RoomList;
