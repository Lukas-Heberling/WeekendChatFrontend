import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  cardDiv: {
    height: '4em',
    width: '12em',
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
  },
  cardDivHoverd: {
    height: '4em',
    width: '12em',
    backgroundColor: 'lightgrey',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
  },
} 

const ChatSelectionCard = (props) => {
  const {name, id} = props;

  const [hoverd, setHoverd] = useState();

  const navigate = useNavigate();

  const handlePress = () => {
    navigate(`chat/${id}/${name}`, { replace: true });
  }

  return (
    <div
      style={hoverd ? styles.cardDivHoverd : styles.cardDiv}
      onClick={handlePress}
      onMouseEnter={() => setHoverd(true)}
      onMouseLeave={() => setHoverd(false)}
    >
        {/* Todo on hoverd would be cool to have an arrow pointing to the right */}
        {`${name}`}
    </div>
  );
};

export default ChatSelectionCard;