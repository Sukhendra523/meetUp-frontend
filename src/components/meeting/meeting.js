import React from 'react';
import Screen from './screen';
import "./meeting.css" 

function Meeting() {

    return (
        <>
            <div className="meeting-content-wrapper">
                <div className="meeting-container meeting-content">
                    <div className="screen-container meeting-container">
                        <Screen/>
                    </div>
                    <div className="bottom-toolbox-container meeting-container">
                         
                    </div>
                </div>
                <div className="chat-container meeting-container">

                </div>
            </div>
        </>
    )

}

export default Meeting;