import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './App.css';

const socket = new io("http://localhost:3001");

function App() {

  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState();
  const [anotherUserId, setAnotherUserId] = useState();

  useEffect(() => {

    const promptUserId = prompt("Enter user id");
    const promptAnotherUserId = prompt("Enter another user id");

    setUserId(promptUserId);
    setAnotherUserId(promptAnotherUserId);

    socket.emit("getMsg", { msgId: generateMsgId() });
  }, []);

  socket.on("catchMsg", (data) => {
    const msgs = data.filter(element => element.msgId == generateMsgId());

    setMessages(msgs);
  });

  const generateMsgId = () => {
    const msgId = userId > anotherUserId ? userId + anotherUserId : anotherUserId + userId;

    return msgId;
  };

  const handleSendMsg = (e) => {
    e.preventDefault();

    socket.emit("sendMsg", {
      msg: e.target[0].value,
      userId,
      msgId: generateMsgId()
    });
  };

  return (
    <>
      <form onSubmit={handleSendMsg}>
        <input type="text" required />
        <button type='submit'>Send</button>
      </form>
      <div>
        {messages.map(element => {
          return <span>{element.msg} <br /></span>
        })}
      </div>
    </>
  )
}

export default App
