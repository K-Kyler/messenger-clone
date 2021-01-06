import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { FormControl, Input, InputLabel, IconButton } from '@material-ui/core';
import Message from './components/Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import Login from './components/Login';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');

  var messagesEnd = useRef(null);

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({
          id: doc.id, 
          message: doc.data()
        })));
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageHandler = (e) => {
    e.preventDefault();

    // Append new message to firebase store
    db.collection('messages').add({
      message: input,
      username: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Clear the input
    setInput('');
  }

  const setInputHandler = (e) => {
    setInput(e.target.value);
  }

  const scrollToBottom = () => {
    {user != '' ? messagesEnd.scrollIntoView({ behavior: "smooth" }) : ''}
  }

  return (
    <div className="app">
      {!user ? <Login user={user} setUser={setUser} /> :
        <>
          <div className="app__header">
            <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" />
            <h1>Messenger App</h1>
            <h2>What's up {user.displayName}</h2>
          </div>

          <form 
            onSubmit={sendMessageHandler} 
            className="app__form"
          >
            <FormControl className="app__formControl">
              <InputLabel>Send a message...</InputLabel>
              <Input 
                className="app__input"
                onChange={setInputHandler} 
                value={input} 
              />
              <IconButton
                className="app__iconButton"
                disabled={!input} 
                variant="contained" 
                color="primary" 
                type="submit"
              >
                <SendIcon />
              </IconButton>
            </FormControl>
          </form>

          <FlipMove className="app__flipMove">
            {
              messages.map(({ id, message }) => (
                <Message 
                  key={id} 
                  userEmail={user.email}
                  message={message}
                />
              ))
            }
          </FlipMove>

          <div ref={(el) => { messagesEnd = el; }}></div>
        </>
      }
    </div>
  );
}

export default App;
