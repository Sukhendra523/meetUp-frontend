import React, { useEffect, useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";

function AllParticipants(props){

    const [participants, setParticipants] = useState([]);
      

    useEffect(() => {
        console.log("props.refreshUserList", props.refreshUserList)
        setParticipants(props.participantList());
    }, [props.refreshUserList])
    return (
        <>
            <h3 className="text-dark">Participant List</h3>
            <ul class="mt-5 list participant-list"> 
                {
                    participants.map(participant => (
                        <li>
                            <div><AiOutlineUser fill="#000000"/> {participant._displayName.split('#')[0]}</div>
                            <div><p className="custom-btn custom-btn-danger text-danger mb-0" onClick={() => props.kickOutUser(participant._id)}>Remove</p></div>
                        </li>
                    ))
                }
            </ul>
        </>
    )

}

export default AllParticipants;
