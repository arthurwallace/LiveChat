import { Button } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

const Chat = ({messages, user, sendMessage, closeConnection}) => <div className="col-12 col-sm-10 col-xl-8 col-xxl-7 mx-auto mt-5">
    <div className="leave-room">
        <Button variant='danger' onClick={() => closeConnection()}>Sair</Button>
    </div>
    <div className='chat'>
        <MessageContainer messages = {messages} user = {user}/>
        <SendMessageForm sendMessage={sendMessage} />
    </div>
</div>

export default Chat;
