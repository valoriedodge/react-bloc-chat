import React, {Component} from 'react';
import moment from 'moment';

class MessageList extends Component {
  constructor(props) {
     super(props);
	console.log("In messagelist");
     this.state = {
	messages: [],
	newMessage: ''
     };
     this.messagesRef = this.props.firebase.ref('messages/' + this.props.roomId);
     this.handleChange= this.handleChange.bind(this);
     this.handleSubmit= this.handleSubmit.bind(this);
  }

  componentDidMount() {
     this.props.firebase.ref('messages/' + 3).on('child_added', snapshot => {
	const message = snapshot.val();
       	message.key = snapshot.key;
       	this.setState({ messages: this.state.messages.concat( message ) })
     });
   }
   handleChange(event) {
     this.setState({newMessage: event.target.value});
   }

   handleSubmit(event) {
     event.preventDefault();
     const time = moment().format('MMMM Do YYYY, h:mm a');
     console.log(time);
     if (this.state.newMessage !== ''){
       let message = {username: this.props.user,
		    content: this.state.newMessage,
		    sentAt: time
		   };
	var newPostKey = this.props.firebase.ref('messages/' + this.props.roomId).push(message).key;
	console.log(newPostKey);
     }
     this.setState({newMessage: ''});
   }

  render(){
    return (
      <section>
	<h2>Messages</h2>
	{this.state.messages.map((message,index) => 
	  <div key={index}>
		<p>Message</p>
		<p>{this.props.roomId}</p>
		<p>{message.content}</p>
		<p>{message.sentAt}</p>
	  </div>)
	}
	<form onSubmit={this.handleSubmit}>
	  <input type="text" value={this.state.newMessage} onChange={this.handleChange}/>
	  <input type="submit" value="Create New Message"/>
      	</form>
	</section>
    );
  }
}

export default MessageList;
