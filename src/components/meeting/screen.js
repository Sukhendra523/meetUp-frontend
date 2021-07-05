import React, { useEffect } from 'react';
import Img1 from "./images/img (1).jpg";
import Img2 from "./images/img (2).jpg";
import Img3 from "./images/img (3).jpg";
import Img4 from "./images/img (4).jpg";
import Img5 from "./images/img (5).jpg";
import Img6 from "./images/img (6).jpg";
import Video from "./videos/video.mp4"
import VideoMuteFill from './icons/videos_off_icon.svg';
import $ from 'jquery';
import { BsMicFill, BsMicMuteFill, BsCameraVideoFill } from 'react-icons/bs'
import { BiCameraOff } from 'react-icons/bi'
import { AiOutlinePushpin } from 'react-icons/ai'
import { SOCKETURL } from './endpoint';

function Screen(props) {


    // adding event listeners 
    useEffect(() => {

        $(".remote-icons").on("click", (data) => {
            console.log(data)
            console.log(data.currentTarget)
        })



    }, [])

    const images = [
        Img1, Img2, Img3, Img1, Img2, Img3, Img1, Img2, Img3,
        Img1, Img2, Img3, Img1, Img2, Img3, Img1, Img2, Img3,
        Img1, Img2, Img3, Img1, Img2, Img3, Img1, Img2, Img3
    ];

    return (
        <>
            <div className="features-screen whiteboard-container">
                <iframe src={`${SOCKETURL}?id=${props.meetingname}`}/> 
                {
                    ((props.whiteboard && props.whiteboard.onlyAdmin === true) && (props.userrole && props.userrole !== "admin"))  && <div className="transparent-screen"></div>
                } 
            </div>
            <div className="user-meeting-wrapper">
                {
                    // images && images.map((img, index) => (
                    //     <div className={`user-meeting-box video-off`} key={index} id={`user-${index}`}>
                    //         <div className="user-meeting-actions">

                    //         </div>
                    //         <div className="user-meeting-video-wrapper">
                    //             <video className="user-meeting-video" autoPlay controls src={"Video"}></video>
                    //             <img src={img} className="user-meeting-video" />
                    //         </div>
                    //         <div className="user-meeting-data">
                    //             <span>
                    //                 <BsMicMuteFill fill="#ffffff" className="audio-off-icon remote-icons" />
                    //                 <BsMicFill fill="#ffffff" className="audio-on-icon remote-icons" />
                    //                 <BsCameraVideoFill fill="#ffffff" className="video-on-icon remote-icons" />
                    //                 <BiCameraOff fill="#ffffff" className="video-off-icon remote-icons" />
                    //                 <AiOutlinePushpin fill="#ffffff" className="video-off-icon remote-icons fsdfsdf" />
                    //                 John William
                    //             </span>
                    //         </div>
                    //     </div>
                    // ))
                }

            </div>
        </>
    )

}

export default Screen;