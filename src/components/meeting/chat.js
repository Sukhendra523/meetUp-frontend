import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai"
import io from 'socket.io-client';
import { SOCKETURL } from './endpoint';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useParams } from "react-router-dom";

let socket = "";
function Chat(props) {


    const [userName] = useState(props.username);
    const [message, setMessage] = useState("");
    const [messageId, setMessageId] = useState("")
    const [chatListOpen, setChatListOpen] = useState(false);
    const [chatWith, setChatWith] = useState("group");
    const [userId, setUserId] = useState("");
    const [users, setUsers] = useState([

    ]);

    const [messages, setMessages] = useState([
        // {
        //     local: false,
        //     message: "fdgdfg",
        //     messageTo: "group",
        //     userId: 38163,
        //     username: "noname"
        // }
    ])


    useEffect(() => {
        setUserId(props.localUserId);
    }, [props.localUserId])


    useEffect(() => {

        socket = io(SOCKETURL)
        if (socket) {
            socketHandler();
        }

    }, [])


    // receiving and handling data from socket backend
    useEffect(() => {
        socket.on("call-to-frontend", ({ action, data }) => {
            switch (action) {
                case "send-message":
                    let newMessage = JSON.parse(data);
                    newMessage.local = false
                    setMessages(messages => [...messages, newMessage])
                    break;

                default:
                    break;
            }

        })
    }, [])

    useEffect(() => {

        if (chatListOpen === true) {
            let participants = props.participantList()
            setUsers(participants);
        }
    }, [chatListOpen])


    useEffect(() => {
        var url_string = window.location.href
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        console.log("messages: ", messages)
    }, [messages])

    function socketHandler() {
        socket.emit("join", { roomName: props.meetingname })
    }


    function chatHandler(e) {

        e && e.preventDefault();

        if (message) {
            let messageObj = {
                userId: userId,
                username: userName,
                message: message,
                local: true,
                messageTo: messageId ? messageId : "group"
            }
            setMessages(messages => [...messages, messageObj])

            socket.emit("call-to-backend", { action: "send-message", data: JSON.stringify(messageObj) });

            setMessage("");

        }
    }

    function userHandler(user) {
        if (user === "group") {
            setMessageId("");
            setChatWith("group")
            setChatListOpen(false);
            return;
        }
        setMessageId(user._id);
        setChatWith(user._displayName.split('#')[0])
        setChatListOpen(false);
    }

    return (
        <>
            <div className="chat-message-wrapper">

                {
                    props.chatFeatures.privateChat === true && (
                        <div className="chat-tool-box">
                            <h6 className="chat-with text-capitalize" onClick={() => setChatListOpen(!chatListOpen)}>{chatWith} &nbsp;
                                {
                                    chatListOpen ?
                                        <AiFillCaretUp className="chat-list-icon" fill="#000000" /> : <AiFillCaretDown className="chat-list-icon" fill="#000000" />
                                }
                            </h6>

                            {
                                chatListOpen && (
                                    <div className="bg-white chat-user-list-container">
                                        <ul className="chat-user-list list px-1">
                                            <li onClick={() => userHandler("group")}>Group</li>
                                            {
                                                users.map((user) => (
                                                    <li key={user._id} onClick={() => userHandler(user)}>{user._displayName.split('#')[0]}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }

                        </div>
                    )
                }


                <div className="chat-messages">

                    {
                        messageId ?

                            messages && messages.map((message, index) => (
                                ((message.messageTo === userId && message.userId === messageId) || (message.local && message.userId === userId && message.messageTo === messageId)) && (
                                    <div key={index} className={`user-message-container ${message.local ? "" : "remote"} `}>
                                        <p className="user-message-username">{message.username}</p>
                                        <p className="user-message">{message.message}</p>
                                    </div>
                                )
                            ))

                            :

                            messages && messages.map((message, index) => (
                                message.messageTo === "group" && (
                                    <div key={index} className={`user-message-container ${message.local ? "" : "remote"} `}>
                                        <p className="user-message-username">{message.username}</p>
                                        <p className="user-message">{message.message}</p>
                                    </div>
                                )
                            ))
                    }

                </div>
            </div>
            <div className="chat-user-form">
                <form onSubmit={chatHandler}>
                    <input type="text" placeholder="Write your message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <AiOutlineSend type="submit" className={`message-send-icon ${message ? "active" : ""} `} onClick={chatHandler} />
                </form>
            </div>
        </>
    )

}

export default Chat;