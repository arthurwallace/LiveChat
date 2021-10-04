import { Form, Button } from "react-bootstrap";
import { useState } from "react";

const Lobby = ({joinRoom}) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return <Form className='lobby col-12 col-sm-10 col-xl-8 col-xxl-3 mx-auto mt-15'
    onSubmit={e => {
        e.preventDefault();
        joinRoom(user, room);
    }}>
        <Form.Group>
            <Form.Control placeholder='nome' onChange={e => setUser(e.target.value)} />
            <Form.Control placeholder='sala' onChange={e => setRoom(e.target.value)} />
        </Form.Group>
        <Button className="btnJoin" type='submit' disabled={!user || !room}>Entrar</Button>
    </Form>
}

export default Lobby;