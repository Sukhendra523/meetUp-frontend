import React, { useEffect, useState } from "react";
import { BsXSquare, BsDisplay, BsMic, BsCameraVideo, BsChat } from "react-icons/bs";
import { BiChalkboard, BiCog } from "react-icons/bi"
import $ from 'jquery'
import MeetingLayout from "./options/layout";
import AllParticipants from "./participantList";

function BottomToolbox(props) {


    const [settings, setSettings] = useState([
        {
            name: "Layout",
            icon: <BiChalkboard fill="#464950" />
        },
        {
            name: "Devices",
            icon: <BiChalkboard fill="#464950" />
        },
        {
            name: "Participants",
            icon: <BiChalkboard fill="#464950" />
        }
    ])

    const [option, setOption] = useState("");

    function menuContentHandler(option) {
        setOption(option)
    }


    function chatHandler() {
        $(`.meeting-content-wrapper`).toggleClass('chat');
    }


    useEffect(() => {
        $(window).on("keydown", (e) => {
            if (e.keyCode === 27) {
                $(`.meeting-content-wrapper`).removeClass('chat');
            } else if (e.keyCode === 67 && props.chatFeatures.enable === true) {
                $(`.meeting-content-wrapper`).addClass('chat');
            }
        })
    })

    return (
        <>
            <div className="toolbox">

                <div className="tool-icon-wrapper">
                    <div className="tool-icon tool-video" onClick={() => props.audioVideoHandler("video")} >
                        <div className="off-line"></div>
                        <BsCameraVideo fill="#000000" />
                    </div>
                    <p>Cam</p>
                </div>
                <div className="tool-icon-wrapper">
                    <div className="tool-icon tool-audio" onClick={() => props.audioVideoHandler("audio")} >
                        <div className="off-line"></div>
                        <BsMic fill="#000000" />
                    </div>
                    <p>Mic</p>
                </div>

                {
                    ((props.shareScreenFeature && props.shareScreenFeature.enable === true && props.shareScreenFeature.onlyAdmin === true && props.userrole === "admin") || (props.shareScreenFeature && props.shareScreenFeature.enable === true && props.shareScreenFeature.onlyAdmin === false)) && (
                        <div className="tool-icon-wrapper">
                            <div className="tool-icon tool-share-screen" onClick={() => props.shareScreen()}>
                                <div className="off-line"></div>
                                <BsDisplay fill="#0066f9" />
                            </div>
                            <p>Share</p>
                        </div>
                    )
                }

                {
                    props.chatFeatures && props.chatFeatures.enable === true && (
                        <div className="tool-icon-wrapper">
                            <div className="tool-icon" onClick={() => chatHandler()}>
                                <BsChat fill="#000000" />
                            </div>
                            <p>Chat</p>
                        </div>
                    )
                }




                {
                    props.whiteboard && props.whiteboard.enable && (
                        <div className="tool-icon-wrapper">
                            <div className="tool-icon" onClick={() => props.whiteboardHandler(props.whiteboard)}>
                                <BiChalkboard fill="#000000" />
                            </div>
                            <p>Whiteboard</p>
                        </div>
                    )
                }


                <div className="tool-icon-wrapper">
                    <div className="tool-icon" onClick={() => props.settingHandler(true)}>
                        <BiCog fill="#000000" />
                    </div>
                    <p>Settings</p>

                </div>


                <div className="tool-icon-wrapper">
                    <div className="tool-icon" onClick={() => props.unload()}>
                        <BsXSquare fill="#ffb2b1" />
                    </div>
                    <p>Leave</p>
                </div>

            </div>

            <div className="setting-container">
                <div className="setting-content">
                    <p className="close-layout text-danger" onClick={() => props.settingHandler(false)}>Close</p>
                    <div className="setting-tool">
                        <ul className="list py-5 px-0">
                            {
                                settings.map((setting, index) => (
                                    <li className="p-4" key={index} onClick={() => menuContentHandler(setting.name)}><span className="px-2">{setting.icon}</span> {setting.name}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="setting-tool-data">
                        {
                            option && option === "Layout" && <MeetingLayout layoutHandler={props.layoutHandler} />
                        }
                        {
                            option && option === "Participants" && <AllParticipants kickOutUser={props.kickOutUser} participantList={props.participantList} refreshUserList={props.refreshUserList} />
                        }

                    </div>
                </div>
            </div>
        </>
    )

}

export default BottomToolbox;