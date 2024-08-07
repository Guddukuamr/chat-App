import React from 'react'
import { useState } from 'react';
import io from 'socket.io-client';
import Chating from './Chating';
import music from './mixkit-tile-game-reveal-960.wav';

const socket = io.connect("http://localhost:1000");



const App = () => {

  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const [showChat, setShowChat] = useState(false);

  const notifation = new Audio(music);

  const joinChat = () => {
    if (userName !== "" && room !== "") {
      socket.emit("Join_Room", room);
      setShowChat(true)
      notifation.play();
    }
  }
  return (
    <>
      {
        !showChat && (
          <div className="container">

            <h1 className='text-center'>Join Chat</h1>
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <input type="text" className="form-control" onChange={(e) => setUserName(e.target.value)} placeholder="Enter Your Name" />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" onChange={(e) => setRoom(e.target.value)} placeholder="Enter Chat Room No" />
                </div>
                <button className="btn btn-primary" onClick={joinChat} type="button">Join Room</button>
              </div>
            </div>
          </div>
        )
      }
      {
        showChat && (

          <Chating socket={socket} userName={userName} room={room} />
        )
      }
    </>
  )
}

export default App
