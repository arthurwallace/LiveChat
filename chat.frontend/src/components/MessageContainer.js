const MessageContainer = ({messages, user}) => {
    return <div className='message-container'>
        {messages.map((m, index) => 
            <div key={index} className='user-message row'>
                {m.userId === user.id
                ?<div><span className='message message-sent'>{m.message}</span></div>
                :<div className='text-start'><span className='message message-received'>{m.message}</span></div>}
                {m.userId === user.id
                ?<div className='from-user from-user-sent'>{m.user}</div>
                :<div className='from-user from-user-received'>{m.user}</div>}
            </div>
        )}
    </div>
}

export default MessageContainer;