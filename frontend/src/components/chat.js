import React from "react";

export default function Chat({ contact, user, messages, sendMessage }) {
  return (
    <>
      {contact ? (
        <>
          <div id="chat-messages" style={{ height: "80vh" }} className="chat-container">
          {messages.map((item, index) => (
              <div key={index}>
                <div className={`chatbar-${item.idSender === user.id ? "sender":"recipient"}`}>
                  {item.idSender === user.id && (
                    <img src={`http://localhost:5000/uploads/${user.photo}`} className="bubble-avatar" alt="avatar" />
                  )}
                  <div className={ item.idSender === user.id ? "chat-me" : "chat-other"}>{item.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input 
              placeholder="Send Message" 
              className="chat-input-message" 
              onKeyPress={sendMessage}
              onChange={()=>{}} />
          </div>
        </>
      ) : (
        <div className="chat-no-message">
          No Message
        </div>
      )}
    </>
  );
}