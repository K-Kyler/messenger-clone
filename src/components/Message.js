import React, { forwardRef } from 'react';
import './Message.css';
import { Card, CardContent, Typography, Avatar } from '@material-ui/core';

const Message = forwardRef(({ userEmail,  message}, ref) => {
    const isUser = userEmail === message.email;

    return (
        <div ref={ref} className={`message ${isUser && "message__user"}`}>
            <div className="message__component">
                {!isUser && <Avatar className="message__avatar" src={message.profilePic} />}
                <div className="message__body">
                    <h2>{!isUser && `${message.username}`}</h2>
                    <Card 
                        className={isUser ? "message__userCard" : "message__guestCard"}
                        title={new Date(message.timestamp?.toDate()).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                component="h2"
                            >
                                {message.message}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
})

export default Message
