import { Button } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const Chat = ({messages, user, sendMessage, closeConnection}) => <div>
    <div className="leave-room">
        <Button variant='danger' onClick={() => closeConnection()}>Sair</Button>
    </div>
    <div className='chat'>
        <MessageContainer messages = {messages} user = {user}/>
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;
