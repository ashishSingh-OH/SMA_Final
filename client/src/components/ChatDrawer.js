import React, {useState} from 'react'
import { Drawer, Button } from 'antd';

const ChatDrawer = (props) => {
    
    
    
    
    const onClose = () => {
        props.setVisible(false);
    };
  
    return (
    <>
        <Drawer title={props.currentId} placement="right" width={540} onClose={onClose} visible={props.visible}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
      </Drawer>
    </>  
    )
}

export default ChatDrawer