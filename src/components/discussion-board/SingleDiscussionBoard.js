import React, {useState} from 'react'
import "./DiscussionStyle.css"
import sendbtn from "../images/send.png"

const SingleDiscussionBoard = () => {
    localStorage.setItem('page_title', 'CSC 401 Discussion');

    const [isRightBubble, setIsRightBubble] = useState(false)

    const leftChatBubble = (message='', time='', position='') => {
        return (<div className="left-bubble-container col-xl-9">
            <div className="left-bubble-message">
                Lorem message for the left bubble Lorem message for the left bubble Lorem message for the left bubble
            </div>
            <div className="left-bubble-date">
                <small>25-01-2023 @ 02:24 pm</small>
            </div>
        </div>);


        // var chatMainContainer = document.getElementById('main-chat-container');
        //
        // const bubble = document.createElement("div");
        // bubble.innerHTML = '<div>{message}</div><div>{time}</div>';
        // bubble.style.backgroundColor = "orange";
        // bubble.classList.add("box");
        //
        // chatMainContainer.appendChild(bubble);
    }
    const rightChatBubble = () => {
        return (<div className="right-bubble-container col-xl-9">
            <div className="right-bubble-message">
                Lorem message for the right bubble Lorem message for the right bubble Lorem message for the right bubble
            </div>
            <div className="right-bubble-date">
                <small>25-01-2023 @ 02:24 pm</small>
            </div>
        </div>);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        var chatMainContainer = document.getElementById('main-chat-container');
        var chatInput = document.getElementById('discussion-input-field');

        // isRightBubble ? chatMainContainer.appendChild(rightChatBubble()) : chatMainContainer.appendChild(leftChatBubble())

        chatInput.value = ''
        setIsRightBubble(!isRightBubble)
        console.log(e)
    }

    return (
        <div className='col-xl-12 col-lg-12 col-sm-12'>
            <div id="main-chat-container" className="main-chat-container">
                {
                    rightChatBubble()
                }
                {
                    leftChatBubble()
                }
                {
                    rightChatBubble()
                }
                <form id='discussionForm' name='discussionForm' onSubmit={handleFormSubmit}>
                    <input type='text' id='discussion-input-field' className="discussion-input"
                           placeholder="Enter your message..." />
                </form>
            </div>
        </div>
    );
};

export default SingleDiscussionBoard;
