import React, {Component} from 'react';

class RoomList extends Component {
  render(){
    return (
      <section>
	<h2>Rooms</h2>
	{this.props.rooms.map((room,index) => 
	  <div mumbu={room.key} onClick={this.props.selectRoom} key={room.key}>{room.name}</div>)
	}
	<form onSubmit={this.props.handleSubmit}>
	  <input type="text" value={this.props.newRoom} onChange={this.props.handleChange}/>
	  <input type="submit" value="Create New Room"/>
      	</form>
	</section>
    );
  }
}

export default RoomList;
