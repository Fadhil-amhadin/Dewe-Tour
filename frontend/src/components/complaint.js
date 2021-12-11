import Navbar from "./navbar"
import { useEffect, useState } from "react";
import Contact from "../components/contact";
import Chat from "../components/chat";
import { io } from "socket.io-client"
import jwt_decode from "jwt-decode";
import "./complaint.css"

let socket;
function Complaint(){
    const [contact, setContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [messages, setMessages] = useState([]);

    const localToken = localStorage.getItem('token')
    const token = localToken ? jwt_decode(localToken): null


    useEffect(() => {
        socket = io("http://localhost:5000", {
          auth: {
            token: localStorage.getItem("token"),
          },
          query: {
            id: token.id,
          },
        })
        loadContact();

        socket.on("connect_error", (err) => {
          console.error(err.message); // not authorized
        });

        loadMessages();

        socket.on("new message", () => {
          socket.emit("load messages", contact?.id);
        });

        return () => {
            socket.disconnect();
        }
    }, [messages])

    const loadContact = () => {
      socket.emit("load admin contact");
      socket.on("admin contact", (data) => {
      const senderMessages = messages.length > 0 ? messages.filter((e) => {return e.idSender === contact.id}) : null;
        const dataContact = {
          ...data,
          message: senderMessages ? (senderMessages.length > 0 ? senderMessages[senderMessages.length - 1].message : "Click here to start message") : "Click here to start message",
        };
        setContacts([dataContact]);
      });
    };

    const onClickContact = (data) => {
      setContact(data);
      socket.emit("load messages", data.id);
    };

    const loadMessages = () => {
      socket.on("messages", (data) => {
        if (data.length !== messages.length) {
          if (data.length > 0) {
            const dataMessages = data.map((item) => ({
              idSender: item.sender.id,
              message: item.message,
            }));
            setMessages(dataMessages);
          }
        }
      });
    };

    const onSendMessage = (e) => {
      if (e.key === "Enter") {
        const data = {
          idRecipient: contact.id,
          message: e.target.value,
        };
        socket.emit("send message", data);
        e.target.value = "";
        loadMessages();
      }
    };

    return (
        <>
            <Navbar/>
            <div className="complaint-container">
              <div className="complaint-contact-col">
                <Contact dataContact={contacts} clickContact={onClickContact} contact={contact} />
              </div>
              <div className="complaint-message-col">
                <Chat contact={contact} user={contact} messages={messages} sendMessage={onSendMessage} />
              </div>
            </div>
        </>
    )
}

export default Complaint;