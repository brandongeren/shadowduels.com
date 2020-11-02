import React from 'react';

import './Message.css';

// use ReactEmoji to encode emojis
// this should obviously eventually be optional
// would be cool to have custom emojis as well :)
import ReactEmoji from 'react-emoji';

const Message = ({message: { text, user }, name}) => {
  let isSentByCurrentUser = user === name.trim().toLowerCase();

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{name}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pl-10 ">{user}</p>
        </div>
      )
  );
}

export default Message;
