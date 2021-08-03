import { Button, TextField } from '@material-ui/core';
import React from 'react';
import axios from 'axios';


function JoinBlock({ onLogin }) {
    const [roomId, setRoomId] = React.useState("");
    const [userName, setUserName] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

//   const setRoomId1 =window.location.pathname.substring(1).split('/')[1];

//   console.log(!setRoomId1?"komnata ne zadana":setRoomId(1));
 

    const onEnter = async () => {
        if (!userName) { return alert('Please, enter your name'); }
        let obj = {
            roomId,
            userName,
        };
        const response = await axios.post('/rooms', obj)
        setRoomId(response.data[0]);
        obj.roomId = response.data[0];
        setLoading(true);
        onLogin(obj);
    }

    return (
        <div className="join-block">
            <TextField
                id="outlined-basic"
                label="Enter your name"
                variant="outlined"
                value={userName}
                onChange={(e) => { setUserName(e.target.value) }}
            />
            <Button
                disabled={isLoading}
                variant="contained"
                color="primary"
                onClick={onEnter}>
                {isLoading ? 'Loading...' : 'Enter'}
            </Button>
        </div>
    );
}

export default JoinBlock;
