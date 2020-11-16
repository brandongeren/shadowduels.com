import React from 'react';

import './Message.css';

// use ReactEmoji to encode emojis
// this should obviously eventually be optional
// would be cool to have custom emojis as well :)
import ReactEmoji from 'react-emoji';

function Message({ message: { text, user }, name }) {
  let isSentByCurrentUser = user === name.trim().toLowerCase();

  return (
    <div className="messageContainer justifyEnd">
      <p className={isSentByCurrentUser? "sender red" : "sender blue"}>{user}: </p>
      <p className="message">{ReactEmoji.emojify(text)}</p>
    </div>
  );
}

export default Message;
