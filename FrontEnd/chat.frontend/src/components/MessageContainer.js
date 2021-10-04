var sender = false, admin = false;
const MessageContainer = ({messages, user}) => {
    {console.log(messages)}
    return <div className='message-container'>
        {messages.map((m, index) => 
            <div key={index} className='user-message row'>
                {sender = m.userId === user.id}
                {admin = m.userId === 0}
                {admin 
                ? [m.message.includes('saiu')
                    ? <div><span className='message message-admin user-left'>{m.message}</span></div>
                    : <div><span className='message message-admin'>{m.message}</span></div>]
                : [sender
                    ?<div className='text-end'><span className='message message-sent'>{m.message}</span></div>
                    :<div className='text-start'><span className='message message-received'>{m.message}</span></div>]}
                
                {admin 
                ? ''
                : [sender
                    ?<div className='from-user from-user-sent'>{m.user}</div>
                    :<div className='from-user from-user-received'>{m.user}</div>]}
            </div>
        )}
    </div>
}

export default MessageContainer;