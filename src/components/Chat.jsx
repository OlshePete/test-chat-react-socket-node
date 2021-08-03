
import { Button, TextField } from '@material-ui/core';
import React from 'react';
import socket from "../socket";

function Chat({ users, messages, userName, roomId, onAddMessage }) {
    const [messageValue, setMessageValue] = React.useState('');
    const messagesRef = React.useRef(null);


    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            userName,
            roomId,
            text: messageValue,
        });
        onAddMessage({ userName, text: messageValue });
        setMessageValue('');
    }

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);
    console.log("messages",messages);
    console.log("users",users);
    return (
        <div className="chat">
            <div className="chat-users">
                Комната №: <b>{roomId}</b>
                <hr />
                <b>Онлайн ({users.length?users.length:1}):</b>
                <ul>
                    {users.map((name, index) => (
                        <li key={name + index}>{name}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-messages">
                <div ref={messagesRef} className="messages">
                    {messages.map((message) => (
                        <div className="message">
                            <p>{message.text}</p>
                            <div>
                                <span>send by {message.userName}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="chat-input">
                    <form>
                        <TextField
                            id="outlined-multiline-static"
                            label="Enter message text"
                            minRows="3"
                            variant="outlined"
                            value={messageValue}
                            onChange={(e) => { setMessageValue(e.target.value) }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSendMessage}>
                            Send message
            </Button>
                    </form></div>
            </div>


        </div >
    );
}

export default Chat;
