import React, { useState, useEffect, useRef } from 'react';
import chatMusic from  './iphone-sms-tone-original-mp4-5732.mp3';

const Chating = ({ socket, userName, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const notifation = new Audio(chatMusic);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                id: Math.random(),
                room: room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() % 12 + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
            
        }
    }

    useEffect(() => {
        const handleReciveMag = (data) => {
            setMessageList((list) => [...list, data]);
            notifation.play();
        }
        socket.on("receive_massage", handleReciveMag)
        
        return () => {
            socket.off("receive_massage", handleReciveMag);
           
        }
    }, [socket]);

    const conaintRef = useRef(null)

    useEffect(() => {
        conaintRef.current.scrollTop = conaintRef.current.scrollHeight
    }, [messageList]);

    return (
        <>
            <div className="chat_container">
                <h1 style={{color:"#fff"}}>Welcome {userName}</h1>

                <div className="chat_box">

                    <div className="scrolling-baar"
                    ref={conaintRef}
                        style={{
                            height: "695px",
                            overflowY: "auto",
                            borderRadius: "2px solid blue"
                        }}
                        >


                        {
                            messageList.map((data) => (
                                <div key={data.id} className='message-content' id={userName == data.author ? "you" : "othor"}>
                                    <div>
                                        <div className="msg" id={userName == data.author ? "g" : "o"}>
                                            <p>{data.message}</p>
                                        </div>
                                        <div className="msg-details" id={userName == data.author ? "a" : "t"}>
                                            <p>{data.author}</p>
                                            <p>{data.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="chat_body">
                        <input
                            value={currentMessage}
                            type="text"
                            placeholder="Type Your Message"
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            onKeyPress={(e) => { e.key == "Enter" && sendMessage() }}
                        />
                        <i className='bx bxs-send' onClick={sendMessage}></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chating;