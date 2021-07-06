import React, { useState } from "react";
import Img1x2 from './images/1x2.png';
import Img2x2 from './images/2x2.png';
import Img2x3 from './images/2x3.png';
import Img3x3 from './images/3x3.png';
import Img4x4 from './images/4x4.png';
import $ from 'jquery';

let classes = "";
function MeetingLayout(props){

    const [layouts] = useState([
        {
            name: "Img1x2",
            img: Img1x2,
            classes: "tile-view grid2",
            screen: 2
        },
        {
            name: "Img2x2",
            img: Img2x2,
            classes: "tile-view grid4",
            screen: 4
        },
        {
            name: "Img2x3",
            img: Img2x3,
            classes: "tile-view grid6",
            screen: 6
        },
        {
            name: "Img3x3",
            img: Img3x3,
            classes: "tile-view grid9",
            screen: 9
        },
        {
            name: "Img3x4",
            img: Img4x4,
            classes: "tile-view",
            screen: 12
        }

    ])

    

    return (
        <>
            <h3 className="text-dark">Meeting Layout</h3>
            <div className="layout-container">

                <div className="default-layout" onClick={() => props.layoutHandler("default")}>
                    <h4>Default</h4>
                </div>   
                {
                    layouts && layouts.map((layout, index) => (
                        <div onClick={() => props.layoutHandler(layout)} key={index}><img src={layout.img} className="layout-img" /></div>       
                    ))
                }
            </div>
        </>
    )

}

export default MeetingLayout;