import React, {Component} from 'react';
import moment from 'moment';

class MessageList extends Component {
  render(){
    return (
      <section>
	<h2>Messages</h2>
	{this.props.messages.map((message,index) => 
	  <div key={index}>
		<p>Message</p>
		<p>{this.props.roomId}</p>
		<p>{message.content}</p>
		<p>{message.sentAt}</p>
	  </div>)
	}
	<form onSubmit={this.props.handleSubmit}>
	  <input type="text" value={this.props.newMessage} onChange={this.props.handleChange}/>
	  <input type="submit" value="Create New Message"/>
      	</form>
	</section>
    );
  }
}

export default MessageList;
