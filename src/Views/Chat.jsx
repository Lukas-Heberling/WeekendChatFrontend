import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useAuth } from '../Contexts/Authentication';
import MessageCard from '../Components/MessageCard';

const Chat = () => {
  const {id: toId, name: toName} = useParams();
  const authentication = useAuth();
  const currentUser = authentication.currentUser;
  const {name: fromName, id: fromId} = currentUser;

  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState();

  const scroll2Bottom = () => {
    const element = document.getElementById('messageDiv');
    element.scrollTop = element.scrollHeight;
  }

  const getChat = () => {
    fetch(`http://192.168.0.157:2509/get_chat/${fromId}/${toId}`)
    .then((response) => response.json())
    .then((response) => {
      setMessages(response.value);
    })
    .catch((error) => console.error(error));
  }

  const sendMessage = () => {
    fetch(`http://192.168.0.157:2509/create_message/${fromId}/${toId}/${newMessage}`)
    .then((response) => response.json())
    .then((response) => {
      getChat();
      setNewMessage("");
      console.log(response)
    })
    .catch((error) => console.error(error));
  }

  /** Get the Chat when rendered */
  useEffect(() => {
    const intervalId = setInterval(() => {
      getChat();
    }, 2000);
  
    return () => {
      clearInterval(intervalId);
    }
  });

  useEffect(() => {
    scroll2Bottom();
  }, [messages]);


  return (
    <div>
      <h1>Chat with {toName}</h1>
      <p>
        <Link to="/">Back to Chats</Link>
      </p>
      <div id="messageDiv" style={{height: '60%', overflow: 'scroll'}}>
        {
          messages && messages.map((element) => (
            <div key={`MessageKey_${element.sender}_${element.time}`}>
              <MessageCard
                name={element.sender}
                message={element.message}
                highlighted={element.sender === fromName ? true : false}
              />
            </div>
          ))
        }
      </div>
      <p>
        <input
          placeholder="New Message :)"
          type="text"
          id="newMessage"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button onClick={() => sendMessage()}>Send</button>
      </p>
    </div>
  )
}

export default Chat;