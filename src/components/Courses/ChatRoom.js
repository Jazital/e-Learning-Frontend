import React, {useState} from 'react'

import Chat, {Bubble, useMessages} from '@chatui/core';
import '@chatui/core/dist/index.css';

const ChatRoom = () => {
    const {messages, appendMsg, setTyping} = useMessages([]);

    function handleSend(type, val) {
        if (type === 'text' && val.trim()) {
            appendMsg({
                type: 'text',
                content: {text: val},
                position: 'right',
            });

            setTyping(true);

            setTimeout(() => {
                appendMsg({
                    type: 'text',
                    content: {text: 'Bala bala'},
                });
            }, 1000);
        }
    }

    function renderMessageContent(msg) {
        const {content} = msg;
        return <Bubble content={content.text} />;
    }

    return (
        <div className='col-xl-8 col-lg-12 col-sm-12'>
            <Chat
                navbar={{title: 'Student'}}
                messages={messages}
                renderMessageContent={renderMessageContent}
                onSend={handleSend}
            />
        </div>
    );
};

export default ChatRoom
