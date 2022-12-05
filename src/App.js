import "./App.css";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Input,
} from "reactstrap";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io("http://localhost:3001"); // the main namespace

function App() {
  const [room, setRoom] = useState("");
  const [sender, setSender] = useState("");
  const [senderReceived, setSenderReceived] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room,});
  };

  const messageSender = () => {
    socket.emit("message_sender", { sender,message,room});
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
    socket.on("receive_sender", (data) => {
      setSenderReceived(data.sender);
    });
  }, []);
  return (
    <div
      className="App"
      style={{
        width: "100%",
      }}
    >
      <Input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <Button color="success" onClick={joinRoom}>
        Join Room
      </Button>

      <Input
        type="text"
        placeholder="Enter Your Name"
        onChange={(event) => {
          setSender(event.target.value);
        }}
      />
      <Button color="success" onClick={messageSender}>
        Click
      </Button>

      <Input
        type="text"
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <Button color="success" onClick={sendMessage}>
        Send Message
      </Button>

      <Card
        className="my-2"
        color="dark"
        inverse
        style={{
          width: "50%",
          alignItems: "auto",
          margin: "25%",
          height: "600px",
          padding: "auto",
        }}
      >
        <CardHeader>Header</CardHeader>
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardText
            style={{
              fontSize: "larger",
            }}
          >
            {senderReceived}:{messageReceived}
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
