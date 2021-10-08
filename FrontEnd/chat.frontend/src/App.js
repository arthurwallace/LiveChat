import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lobby from './components/Lobby';
import Chat from './components/Chat';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import { useState } from 'react';

const App = () => {
  const [connection, setConnection] = useState();
  const [userConnected, setUser] = useState();
  const [messages, setMessages] = useState([]);
  
  const joinRoom = async (user, room) => {
    try{
      const UrlAPI = (process.env.REACT_APP_API || 'https://localhost:44384');
      const userId = Math.floor(Math.random()*(999-100+1)+100);
      const userConnected = {id: userId, name: user, room: room};
      setUser(userConnected);
      const connection = new HubConnectionBuilder()
      .withUrl(UrlAPI + "/chat")
      .configureLogging(LogLevel.Information)
      .build();

      connection.on("ReceiveMessage", (userId, user, message) => {
        setMessages(messages => [...messages, {userId, user, message}]);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
      })

      await connection.start();
      await connection.invoke("JoinRoom", {userId,user,room});
      setConnection(connection);

    }
    catch(e){
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try{
      await connection.stop();
    }
    catch(e){
      console.log(e);
    }
  }


  const sendMessage = async (message) => {
    try{
      await connection.invoke("SendMessage", message);
    }
    catch(e){
      console.log(e);
    }
  }


  return <div className='app'>
    <h2>Live Chat</h2>
    {!connection
    ? <Lobby joinRoom={joinRoom} />
    : <Chat messages={messages} user={userConnected} sendMessage={sendMessage} closeConnection = {closeConnection}/>}
  </div>
}

export default App;
