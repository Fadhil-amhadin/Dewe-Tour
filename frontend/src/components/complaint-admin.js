import Navbar from "./navbar"
import { useEffect, useState} from "react";
import Contact from "../components/contact";
import Chat from "../components/chat";
import { io } from "socket.io-client";
import jwt_decode from "jwt-decode";

let socket;
function ComplaintAdmin(){
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
        
        loadContacts();
        loadMessages();

        socket.on("new message", () => {
          console.log("contact", contact);
          socket.emit("load customer contacts");
          socket.emit("load messages", contact?.id);
        });

        socket.on("connect_error", (err) => {
          console.error(err.message); // not authorized
        });

        return () => {
            socket.disconnect();
        }
    }, [messages])

    const loadContacts = () => {
        socket.emit("load customer contacts");
        socket.on("customer contact", (data) => {
          let dataContacts = data.filter(
            (item) => item.status !== "admin" && (item.recipientMessage.length > 0 || item.senderMessage.length > 0)
          );
          dataContacts = dataContacts.map((item) => ({
            ...item,
            message:
              item.senderMessage.length > 0
                ? item.senderMessage[item.senderMessage.length - 1].message
                : "Click to start message",
          }));
          setContacts(dataContacts);
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
            loadContacts();
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

export default ComplaintAdmin;