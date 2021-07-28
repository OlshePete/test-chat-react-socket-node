import { Button, TextField } from '@material-ui/core';
import React from 'react';

import socket from "../socket";


function JoinBlock() {
  return (
    <div className="join-block">
      <TextField id="outlined-basic" label="Enter your name" variant="outlined" />
      <Button variant="contained" color="primary">  Let's chat</Button>
      </div>
  );
}

export default JoinBlock;
