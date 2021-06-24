import React from "react";
import Img1 from "./images/img (1).jpg";
import Img2 from "./images/img (2).jpg";
import Img3 from "./images/img (3).jpg";
import Img4 from "./images/img (4).jpg";
import Img5 from "./images/img (5).jpg";
import Img6 from "./images/img (6).jpg";

function Screen() {
  return (
    <div className="user-meeting-wrapper">
      <div className="user-meeting-box">
        <div className="user-meeting-actions"></div>
        <div className="user-meeting-video-wrapper">
          <video
            className="user-meeting-video video-off"
            controls
            src=""
          ></video>
          <img src={Img1} className="user-meeting-video" alt="" />
        </div>
        <div className="user-meeting-data">
          <span>John William</span>
        </div>
      </div>

      <div className="user-meeting-box">
        <div className="user-meeting-video-wrapper">
          <video
            className="user-meeting-video video-off"
            controls
            src=""
          ></video>
          <img src={Img2} className="user-meeting-video" alt="" />
        </div>
        <div className="user-meeting-data">
          <span>John William</span>
        </div>
      </div>

      <div className="user-meeting-box">
        <div className="user-meeting-video-wrapper">
          <video
            className="user-meeting-video video-off"
            controls
            src=""
          ></video>
          <img src={Img3} className="user-meeting-video" alt="" />
        </div>
        <div className="user-meeting-data">
          <span>John William</span>
        </div>
      </div>

      <div className="user-meeting-box">
        <div className="user-meeting-video-wrapper">
          <video
            className="user-meeting-video video-off"
            controls
            src=""
          ></video>
          <img src={Img4} className="user-meeting-video" alt="" />
        </div>
        <div className="user-meeting-data">
          <span>John William</span>
        </div>
      </div>

      <div className="user-meeting-box">
        <div className="user-meeting-video-wrapper">
          <video
            className="user-meeting-video video-off"
            controls
            src=""
          ></video>
          <img src={Img5} className="user-meeting-video" alt="" />
        </div>
        <div className="user-meeting-data">
          <span>John William</span>
        </div>
      </div>

      <div className="user-meeting-box main">
        <div className="user-meeting-video-wrapper">
          <video
            className="user-meeting-video video-off"
            controls
            src=""
          ></video>
          <img src={Img6} className="user-meeting-video" alt="" />
        </div>
        <div className="user-meeting-data">
          <span>John William</span>
        </div>
      </div>
    </div>
  );
}

export default Screen;
