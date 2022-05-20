import React from 'react';

const styles = {
  mainDiv: {
    width: '20em',
    backgroundColor: 'lightgrey',
    color: 'black',
  },
  mainDivHighlighted: {
    width: '20em',
    backgroundColor: 'grey',
    color: 'black',
  },
}

const MessageCard = (props) => {
  const {message, name, highlighted} = props;
  return (
    <div style={highlighted ? styles.mainDivHighlighted : styles.mainDiv}>
      <h3>
        {name}
      </h3>
      <p>
        {message}
      </p>
    </div>
  );
};

export default MessageCard;
