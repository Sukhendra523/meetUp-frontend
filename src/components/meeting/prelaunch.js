import React, { useEffect, useState } from "react";
import ItAimsLogo from './images/itaims-logo.svg';

function Prelaunch(props) {

    const [username, setUsername] = useState('');
    const [devices, setDevices] = useState({
        audio: false,
        video: false
    })

    function submitHandler(e) {
        e && e.preventDefault();
        if (!username) {
            alert("Username is required.");
            return;
        }
        localStorage.setItem("name", username);
        localStorage.setItem("devices", JSON.stringify(devices));
        props.history.push("/meetingRoom");
    }

    function deviceHandler(device){
        if(device === "audio"){
            setDevices({
                audio: !devices.audio,
                video: devices.video
            })
        }else{
            setDevices({
                audio: devices.audio,
                video: !devices.video
            })
        }
    }

    console.log(devices)
    useEffect(() => {
        localStorage.setItem("name", "");
    }, [])

    return (
        <div className="prelaunch-container bg-dark">
            <div className="w-25">
                <img src={ItAimsLogo} width="200px" />
                <div>
                    <form onSubmit={submitHandler}>
                        <div className="form-group mt-4">
                            <label className="mb-1 text-white">Enter Your First Name</label>
                            <input type="text" className="form-control" placeholder="Enter your first name" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group form-check mt-2">
                            <label className="form-check-label text-white" htmlFor="audio-state">Audio</label>
                            <input type="checkbox" className="form-check-input" id="audio-state"  onClick={() => deviceHandler("audio")} />
                        </div>
                        <div className="form-group form-check">
                            <label className="form-check-label text-white" htmlFor="video-state">Video</label>
                            <input type="checkbox" className="form-check-input" id="video-state" onClick={() => deviceHandler("video")} />
                        </div>
                        <div className="form-group mt-4">
                            <input type="submit" value="Join Meeting" className="btn btn-primary" style={{ fontSize: "14px" }} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Prelaunch