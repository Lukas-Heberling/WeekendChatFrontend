import React, {useState, useEffect} from 'react';

import ChatSelectionCard from '../Components/ChatSelectionCard';
import { useAuth } from '../Contexts/Authentication';

const ChatSelection = () => {
  const [chats, setChats] = useState();

  const authentication = useAuth();

  const getChats = () => {
    const currentUser = authentication.currentUser;
    fetch(`http://192.168.0.157:2509/get_chats/${currentUser.id}`)
    .then((response) => response.json())
    .then((newChats) => {
      if (newChats && newChats.type === 'success') {
        setChats(newChats.value);
      } else {
        /** TODO implement message handling unknwon error couldnt select chats */
      }
    })
    .catch((error) => {
      /** TODO implement message handling unknown error */
      console.error(error);
    })
  } 

  /** get all the chats when rendered */
  useEffect(() => {
    getChats();
  });

  return (
    <div>
      <h1>Chats</h1>
      <p>
        <button onClick={() => authentication.logout()}>logout</button>
      </p>
      {
        chats && chats.map((element) => (
          <div style={{marginTop: '1em'}} key={`chatCardKey_${element.name}_${element.id}`}>
            <ChatSelectionCard name={element.name} id={element.id} />
          </div>
        ))
      }
    </div>
  );
};

export default ChatSelection;