import React from "react";

export default function Contact({ dataContact, clickContact, contact }) {
  return (
    <>
        {dataContact ? dataContact.length > 0 && (
            <>
                {dataContact.map(item => (
                    <div className="contact-container" key={item.id} onClick={() => clickContact(item)}>
                        <div className="contact-img">
                            <img src={`http://localhost:5000/uploads/${item.photo}`}></img>
                        </div>
                        <div>
                            <ul>
                                <li className="item-one">{item.fullName}</li>
                                <li className="item-two">{item.message}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </>
        ): null}
    </>
  );
}