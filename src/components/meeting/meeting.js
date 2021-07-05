import React, { useEffect, useState } from 'react';
import Screen from './screen';
import "./meeting.css"
import BottomToolbox from './bottomToolbox';
import Chat from './chat';
import $ from 'jquery';
import Img from "./images/img (1).jpg";
import io from 'socket.io-client';
import { SOCKETURL } from './endpoint';


let socket = "";
let meetingname = "thisismeetingname";

/* global $, JitsiMeetJS (Global Variables)  */

const options = {
    serviceUrl: 'https://beta.meet.jit.si/http-bind',
    hosts: {
        domain: 'beta.meet.jit.si',
        muc: 'conference.beta.meet.jit.si'
    },
    resolution: 1080,
    maxFullResolutionParticipants: 2,
    setSenderVideoConstraint: '1080',
    setReceiverVideoConstraint: '180',
    constraints: {
        video: {
            aspectRatio: 16 / 9,
            height: {
                ideal: 1080,
                max: 1080,
                min: 1080
            }
        }
    }
}

const confOptions = {
    openBridgeChannel: true
};

let connection = null;
let isJoined = false;
let room = null;

let localTracks = [];
const remoteTracks = {};


let localAudio = true;
let localVideo = true;
let localScreen = true; // this is true because the shareScreen() function reverts this value...beform performing any actions .
let username = "";

function Meeting(props) {

    const [refreshUserList, setRefreshUserList] = useState("yes");
    const [localUserId, setLocalUserId] = useState("");
    const [userrole] = useState("admin");

    username = localStorage.getItem("name") ? localStorage.getItem("name") : "noname";

    // Features Scttings
    const whiteboard = {
        name: "whiteboard",
        enable: true,
        newtab: false,
        remoteAccess: true, // admin can open other users whiteboard
        onlyAdmin: true // only admin can write on board. 
    }

    const shareScreenFeature = {
        name: "sharescreen",
        enable: true,
        multiSharing: false,
        onlyAdmin: true
    }

    const chatFeatures = {
        name: "chat",
        enable: true,
        privateChat: true
    }

    const adminFeatures = {
        endCallForAll: false,
        removeOtherUsers: true
    }

    /**
 * Handles local tracks.
 * @param tracks Array with JitsiTrack objects
 */
    function onLocalTracks(tracks) {
        localTracks = tracks;
        for (let i = 0; i < localTracks.length; i++) {
            console.log("localTracks localTracks id: ", localTracks[i].getParticipantId())
            localTracks[i].addEventListener(
                JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
                audioLevel => console.log(`Audio Level local: ${audioLevel}`));
            localTracks[i].addEventListener(
                JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                () => console.log('local track muted'));
            localTracks[i].addEventListener(
                JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                () => console.log('local track stoped'));
            localTracks[i].addEventListener(
                JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
                deviceId =>
                    console.log(
                        `track audio output device was changed to ${deviceId}`));
            if (localTracks[i].getType() === 'video') {

                $(".user-meeting-wrapper").append(`

                <div class="user-meeting-box main local-meeting-box">
                    <div class="user-meeting-actions">

                    </div>
                    <div class="user-meeting-video-wrapper">
                        <img src="${Img}" class="user-meeting-video" />
                        <video autoplay='1' id='localVideo${i}' class="user-meeting-video local-video" />
                    </div>
                    <div class="user-meeting-data local-meeting-data">
                        <span>
                            <svg class="audio-off-icon" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0013 8V7a.5.5 0 00-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 014 8V7a.5.5 0 00-1 0v1a5 5 0 004.5 4.975V15h-3a.5.5 0 000 1h7a.5.5 0 000-1h-3v-2.025a4.973 4.973 0 002.43-.923l-.718-.719zM11 7.88V3a3 3 0 00-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 015 8V6.121z" clip-rule="evenodd"></path><path stroke="#000" d="M2 1l12 12"></path></svg>
                            <svg class="audio-on-icon" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a3 3 0 016 0v5a3 3 0 01-6 0V3z"></path><path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z" clip-rule="evenodd"></path></svg>
                            <svg class="video-on-icon" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"></path><path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"></path></svg>
                            <svg class="video-off-icon" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.014,12.135c0.074,2.062,1.789,3.777,3.851,3.851L8.014,12.135z"></path><path d="M4 20h11.879l-2-2H4V8.121L2.144 6.265C2.053 6.493 2 6.74 2 7v11C2 19.103 2.897 20 4 20zM20 5h-2.586l-2.707-2.707C14.52 2.105 14.266 2 14 2h-4C9.735 2 9.48 2.105 9.293 2.293L6.586 5H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414-.626-.626C21.631 19.313 22 18.703 22 18V7C22 5.897 21.103 5 20 5zM13.919 12.505l-2.424-2.425C11.658 10.034 11.826 10 12 10c1.065 0 2 .935 2 2C14 12.174 13.967 12.342 13.919 12.505zM15.421 14.006C15.779 13.412 16 12.729 16 12c0-2.168-1.832-4-4-4-.729 0-1.412.22-2.007.579L7.914 6.5l2.5-2.5h3.172l2.707 2.707C16.48 6.895 16.734 7 17 7l3-.001V18h-.586L15.421 14.006z"></path></svg>
                            <span class="local-username">${username}</span>
                        </span>
                    </div>
                </div>

                `)

                localTracks[i].attach($(`#localVideo${i}`)[0]);

            } else {
                $('body').append(
                    `<audio autoplay='1' muted='true' id='localAudio${i}' />`);
                localTracks[i].attach($(`#localAudio${i}`)[0]);
            }
            if (isJoined) {
                room.addTrack(localTracks[i]);
            }
        }
    }


    /**
     * Handles remote tracks
     * @param track JitsiTrack object
     */
    function onRemoteTrack(track) {
        if (track.isLocal()) {
            return;
        }
        const participant = track.getParticipantId();
        let participantData = room.getParticipantById(participant)._displayName;

        // 0 => name and 1 => role
        participantData = participantData.split('#');


        if (!remoteTracks[participant]) {
            remoteTracks[participant] = [];
        }
        const idx = remoteTracks[participant].push(track);

        track.addEventListener(
            JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
            audioLevel => console.log(`Audio Level remote: ${audioLevel}`));
        track.addEventListener(
            JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
            () => console.log('remote track muted'));
        track.addEventListener(
            JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
            () => console.log('remote track stoped'));
        track.addEventListener(JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
            deviceId =>
                console.log(
                    `track audio output device was changed to ${deviceId}`));
        const id = participant + track.getType() + idx;

        if (track.getType() === 'video') {

            $(".user-meeting-wrapper").append(`

                <div class="user-meeting-box" id="user-meeting-box-${participant}" >
                    <div class="user-meeting-actions">

                    </div>
                    <div class="user-meeting-video-wrapper">
                        <img src="${Img}" class="user-meeting-video" />
                        <video autoplay='1' id='${participant}video${idx}' class="user-meeting-video local-video" />
                    </div>
                    <div class="user-meeting-data" id="user-meeting-data-${participant}">
                        <span>
                            <svg class="audio-off-icon remote-icons ${participant}" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0013 8V7a.5.5 0 00-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 014 8V7a.5.5 0 00-1 0v1a5 5 0 004.5 4.975V15h-3a.5.5 0 000 1h7a.5.5 0 000-1h-3v-2.025a4.973 4.973 0 002.43-.923l-.718-.719zM11 7.88V3a3 3 0 00-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 015 8V6.121z" clip-rule="evenodd"></path><path stroke="#000" d="M2 1l12 12"></path></svg>
                            <svg class="audio-on-icon remote-icons ${participant}" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a3 3 0 016 0v5a3 3 0 01-6 0V3z"></path><path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z" clip-rule="evenodd"></path></svg>
                            <svg class="video-on-icon remote-icons ${participant}" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"></path><path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"></path></svg>
                            <svg class="video-off-icon remote-icons ${participant}" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8.014,12.135c0.074,2.062,1.789,3.777,3.851,3.851L8.014,12.135z"></path><path d="M4 20h11.879l-2-2H4V8.121L2.144 6.265C2.053 6.493 2 6.74 2 7v11C2 19.103 2.897 20 4 20zM20 5h-2.586l-2.707-2.707C14.52 2.105 14.266 2 14 2h-4C9.735 2 9.48 2.105 9.293 2.293L6.586 5H6.414L3.707 2.293 2.293 3.707l18 18 1.414-1.414-.626-.626C21.631 19.313 22 18.703 22 18V7C22 5.897 21.103 5 20 5zM13.919 12.505l-2.424-2.425C11.658 10.034 11.826 10 12 10c1.065 0 2 .935 2 2C14 12.174 13.967 12.342 13.919 12.505zM15.421 14.006C15.779 13.412 16 12.729 16 12c0-2.168-1.832-4-4-4-.729 0-1.412.22-2.007.579L7.914 6.5l2.5-2.5h3.172l2.707 2.707C16.48 6.895 16.734 7 17 7l3-.001V18h-.586L15.421 14.006z"></path></svg>
                            <svg class="pin-to-screen remote-icons ${participant}" stroke="currentColor" fill="#ffffff" stroke-width="0" viewBox="0 0 1024 1024" class="video-off-icon remote-icons" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M878.3 392.1L631.9 145.7c-6.5-6.5-15-9.7-23.5-9.7s-17 3.2-23.5 9.7L423.8 306.9c-12.2-1.4-24.5-2-36.8-2-73.2 0-146.4 24.1-206.5 72.3a33.23 33.23 0 0 0-2.7 49.4l181.7 181.7-215.4 215.2a15.8 15.8 0 0 0-4.6 9.8l-3.4 37.2c-.9 9.4 6.6 17.4 15.9 17.4.5 0 1 0 1.5-.1l37.2-3.4c3.7-.3 7.2-2 9.8-4.6l215.4-215.4 181.7 181.7c6.5 6.5 15 9.7 23.5 9.7 9.7 0 19.3-4.2 25.9-12.4 56.3-70.3 79.7-158.3 70.2-243.4l161.1-161.1c12.9-12.8 12.9-33.8 0-46.8zM666.2 549.3l-24.5 24.5 3.8 34.4a259.92 259.92 0 0 1-30.4 153.9L262 408.8c12.9-7.1 26.3-13.1 40.3-17.9 27.2-9.4 55.7-14.1 84.7-14.1 9.6 0 19.3.5 28.9 1.6l34.4 3.8 24.5-24.5L608.5 224 800 415.5 666.2 549.3z"></path></svg>
                            <span class="remote-username">${participantData[0]}</span>
                        </span>
                    </div>
                </div>

                `)


            addClickEventListener()


        } else {
            $('body').append(
                `<audio autoplay='1' class="user-audio-${participant}" id='${participant}audio${idx}' />`);
        }

        track.attach($(`#${id}`)[0]);
        setRefreshUserList(participant);
        onChangeTrackHandler(track)
    }

    function addClickEventListener() {
        $(".remote-icons").unbind("click")
        $(".remote-icons").on("click", (data) => {
            const classes = data.currentTarget.classList;

            let participantId = classes[2];
            let icon = classes[0];
            if (participantId && (icon === "audio-on-icon" || icon === "audio-off-icon" || icon === "video-on-icon" || icon === "video-off-icon")) {
                if (userrole !== "admin") {
                    return;
                }
                remoteTrackHandler(participantId, icon);
            }

            if (participantId && icon === "pin-to-screen") {
                removeGridView();
                $(`.local-meeting-box`).toggleClass('main');
                let x = $(`#user-meeting-box-${participantId}`).hasClass("main");
                if (x === false) {
                    $(`.user-meeting-box`).removeClass('main');
                }
                $(`#user-meeting-box-${participantId}`).toggleClass('main');
            }
        })
    }

    // function remoteAudioHandler(id){

    //     const participant = room.getParticipantById(id);

    //     if(participant){
    //         let tracks = participant._tracks;
    //         tracks.map((track) => {
    //             track.getType() === "audio" && onRemoteTrack(track)
    //         })
    //     }

    // }

    /**
     * That function is executed when the conference is joined
     */
    function onConferenceJoined() {
        console.log('conference joined!');
        updateDecicesState();
        isJoined = true;
        for (let i = 0; i < localTracks.length; i++) {
            room.addTrack(localTracks[i]);
        }
        setLocalUserId(room.myUserId())
    }

    function updateDecicesState() {
        let devices = localStorage.getItem("devices");
        devices = JSON.parse(devices);
        console.log("devices devices devices: ", devices);
        if (devices) {
            devices.audio === false && audioVideoHandler("audio");
            devices.video === false && audioVideoHandler("video");
        }
    }
    /**
     *
     * @param id
     */
    function onUserLeft(id) {
        setRefreshUserList(id + "updateuserlist");
        // console.log('user left');
        // if (!remoteTracks[id]) {
        //     return;
        // }
        // const tracks = remoteTracks[id];

        // for (let i = 0; i < tracks.length; i++) {
        //     tracks[i].detach($(`#${id}${tracks[i].getType()}`));
        // }
    }

    function participantList() {
        if (room) {
            const participants = room.getParticipants();
            return participants;
        }
    }

    /**
     * That function is called when connection is established successfully
     */
    function onConnectionSuccess() {
        room = connection.initJitsiConference('vcvkluiyuwruwrsd', confOptions);
        room.on(JitsiMeetJS.events.conference.TRACK_ADDED, onRemoteTrack);
        room.on(JitsiMeetJS.events.conference.TRACK_REMOVED, track => {
            console.log(`track removed!!!${track}`);
            removeUser(track);
        });
        room.on(
            JitsiMeetJS.events.conference.CONFERENCE_JOINED,
            onConferenceJoined);
        room.on(JitsiMeetJS.events.conference.USER_JOINED, id => {
            console.log('user join');
            console.log("user join id :", id)
            remoteTracks[id] = [];
        });
        room.on(JitsiMeetJS.events.conference.USER_LEFT, onUserLeft);
        room.on(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, track => {
            console.log(`${track.getType()} - ${track.isMuted()}`);

            if (track.isLocal()) {
                localTrackHandler(track);
            } else {
                onChangeTrackHandler(track)
            }
        });
        room.on(
            JitsiMeetJS.events.conference.DISPLAY_NAME_CHANGED,
            (userID, displayName) => console.log(`${userID} - ${displayName}`));
        room.on(
            JitsiMeetJS.events.conference.TRACK_AUDIO_LEVEL_CHANGED,
            (userID, audioLevel) => console.log(`${userID} - ${audioLevel}`));
        room.on(
            JitsiMeetJS.events.conference.PHONE_NUMBER_CHANGED,
            () => console.log(`${room.getPhoneNumber()} - ${room.getPhonePin()}`));
        room.join();

        room.setDisplayName(username + '#' + userrole);
    }

    // remove user video and audio tag from meeting. 
    function removeUser(track) {
        const participant = track.getParticipantId();

        if (track.getType() === "video") {
            // remove video tag
            const videoTag = $(`#user-meeting-box-${participant}`);
            if (videoTag) videoTag.remove();
        } else {
            // removing audio tag 
            const audioTag = $(`.user-audio-${participant}`)
            if (audioTag) audioTag.remove();
        }
    }

    /**
     * This function is called when the connection fail.
     */
    function onConnectionFailed() {
        console.error('Connection Failed!');
    }

    /**
     * This function is called when the connection fail.
     */
    function onDeviceListChanged(devices) {
        console.info('current devices', devices);
    }

    /**
     * This function is called when we disconnect.
     */
    function disconnect() {
        console.log('disconnect!');
        connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            onConnectionSuccess);
        connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            onConnectionFailed);
        connection.removeEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            disconnect);
    }

    /**
     *
     */
    function unload() {
        if (!room) return;

        // if admin leaves every one leaves. 

        (userrole === "admin" && adminFeatures.endCallForAll === true) && socket.emit("call-to-backend", { action: "endmeeting-for-all" })

        for (let i = 0; i < localTracks.length; i++) {
            localTracks[i].dispose();
        }
        room.leave();
        connection.disconnect();
        props.history.push("/prelaunch");
    }

    /**
     *
     */
    function shareScreen() { // eslint-disable-line no-unused-vars

        if (shareScreenFeature.multiSharing === false) {
            let res = checkScreenShare();
            if (res) {
                alert("Someone is already sharing their screen.");
                return;
            }
        }


        localScreen = !localScreen;
        if (localTracks[1]) {
            localTracks[1].dispose();
            localTracks.pop();
        }
        JitsiMeetJS.createLocalTracks({
            devices: [localScreen ? 'video' : 'desktop']
        })
            .then(tracks => {
                localTracks.push(tracks[0]);
                localTracks[1].addEventListener(
                    JitsiMeetJS.events.track.TRACK_MUTE_CHANGED,
                    () => console.log('local track muted'));
                localTracks[1].addEventListener(
                    JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
                    () => {
                        if (tracks[0].videoType === 'desktop' && localScreen === false) {
                            shareScreen();
                        }
                    });
                localTracks[1].attach($('#localVideo1')[0]);
                room.addTrack(localTracks[1]);

                socket.emit("call-to-backend", { action: "share-screen", data: { status: localScreen ? false : true, id: localTracks[0].getParticipantId() } })
            })
            .catch(error => {
                console.log(error.message);
                shareScreen()
            });
    }


    function shareScreenHandler(data) {
        removeGridView();
        if (data.status === false) {
            $('.user-meeting-box').removeClass('main');
            $('.local-meeting-box').addClass('main');
        } else {
            let interval = setInterval(() => {
                let elem = $(`#user-meeting-box-${data.id}`);
                if (elem.length > 0) {
                    $('.user-meeting-box').removeClass('main');
                    elem.addClass('main');
                    clearInterval(interval)
                }
            }, 200);
        }


    }

    /**
     *
     * @param selected
     */
    function changeAudioOutput(selected) { // eslint-disable-line no-unused-vars
        JitsiMeetJS.mediaDevices.setAudioOutputDevice(selected.value);
    }

    $(window).bind('beforeunload', unload);
    $(window).bind('unload', unload);


    function startMeeting() {
        JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
        const initOptions = {
            disableAudioLevels: true
        };

        JitsiMeetJS.init(initOptions);

        connection = new JitsiMeetJS.JitsiConnection(null, null, options);

        connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
            onConnectionSuccess);
        connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_FAILED,
            onConnectionFailed);
        connection.addEventListener(
            JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,
            disconnect);

        JitsiMeetJS.mediaDevices.addEventListener(
            JitsiMeetJS.events.mediaDevices.DEVICE_LIST_CHANGED,
            onDeviceListChanged);

        connection.connect();

        JitsiMeetJS.createLocalTracks({ devices: ['audio', 'video'] })
            .then(onLocalTracks)
            .catch(error => {
                throw error;
            });

        // if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
        //     JitsiMeetJS.mediaDevices.enumerateDevices(devices => {
        //         const audioOutputDevices
        //             = devices.filter(d => d.kind === 'audiooutput');

        //         if (audioOutputDevices.length > 1) {
        //             $('#audioOutputSelect').html(
        //                 audioOutputDevices
        //                     .map(
        //                         d =>
        //                             `<option value="${d.deviceId}">${d.label}</option>`)
        //                     .join('\n'));

        //             $('#audioOutputSelectWrapper').show();
        //         }
        //     });
        // }
    }

    function audioVideoHandler(type) {

        localTracks.map((track) => {

            if (track.getType() === type) {
                if (type === "audio") {

                    if (localAudio === true) {
                        track.mute();
                    } else {
                        track.unmute();
                    }
                    localAudio = !localAudio;
                    localTrackHandler(track)

                } else {

                    if (localVideo === true) {
                        track.mute()
                    } else {
                        track.unmute()
                    }
                    localVideo = !localVideo;
                    localTrackHandler(track)
                }
            }
        })

    }


    // this function handle on track state changed.
    function onChangeTrackHandler(track) {
        const participant = track.getParticipantId();
        console.log("onChangeTrackHandler: ", track.getType(), ": ", track.isMuted(), participant)

        if (track.getType() === "video") {
            if (track.isMuted()) {
                $(`#user-meeting-box-${participant}`).addClass("video-off")
            } else {
                $(`#user-meeting-box-${participant}`).removeClass("video-off")
            }
        } else {
            if (track.isMuted()) {
                $(`#user-meeting-data-${participant}`).length === 0 && seachAndMuteAudio(`user-meeting-data-${participant}`);
                $(`#user-meeting-data-${participant}`).addClass("audio-off");
            } else {
                $(`#user-meeting-data-${participant}`).removeClass("audio-off")
            }
        }
    }

    function seachAndMuteAudio(elem) {

        let interval = setInterval(() => {
            let element = $(`#${elem}`);
            if (element.length > 0) {
                console.log(element)
                element.addClass("audio-off");
                clearInterval(interval);
            }
        }, [500])

    }

    function localTrackHandler(track) {

        localTracks.map((track) => {

            if (track.getType() === "audio") {

                if (track.isMuted()) {
                    $(".local-meeting-data").addClass("audio-off");
                    $(".tool-audio .off-line").addClass("active");
                } else {
                    $(".local-meeting-data").removeClass("audio-off");
                    $(".tool-audio .off-line").removeClass("active");

                }
            } else {

                if (track.isMuted()) {
                    $(".local-meeting-box").addClass("video-off")
                    $(".tool-video .off-line").addClass("active");
                } else {
                    $(".local-meeting-box").removeClass("video-off")
                    $(".tool-video .off-line").removeClass("active");
                }

            }
        })
    }

    function remoteTrackHandler(participantId, icon) {

        console.log(participantId);
        console.log(icon);

        if (icon === "audio-on-icon" || icon === "audio-off-icon") {
            socket.emit("call-to-backend", { action: "remote-audio-toggle", data: { id: participantId } })
        } else {
            socket.emit("call-to-backend", { action: "remote-video-toggle", data: { id: participantId } })
        }
    }

    function settingHandler(action) {
        action ? $(".setting-container").addClass('active') : $(".setting-container").removeClass('active')
    }

    const socketHandler = () => {
        socket.emit("join", { roomName: meetingname })
    }

    function removeGridView() {
        $(".user-meeting-wrapper").removeClass("tile-view grid9 grid6 grid4 grid2");
    }

    function layoutHandler(layout) {

        removeGridView();
        ;
        if (layout === "default") {
            $(`.user-meeting-box`).removeClass('main')
            $(`.local-meeting-box`).addClass('main')
            return;
        }
        $(`.user-meeting-box`).removeClass('main')
        $(".user-meeting-wrapper").addClass(layout.classes);

        if (layout.screen) {
            $(".user-meeting-box").map(index => {
                let element = $(".user-meeting-box")[index];

                let elementId = element.id;
                if (elementId) {
                    if (index < layout.screen) {
                        $(`#${elementId}`).removeClass("d-none");
                    } else {
                        $(`#${elementId}`).addClass("d-none");
                    }
                }

            })

        }
    }


    function whiteboardHandler(whiteboard, isSocket) {

        if (whiteboard.remoteAccess && userrole === "admin" && isSocket !== true) {
            socket.emit("call-to-backend", { action: "whiteboard", data: { whiteboard } });
        }

        if (!whiteboard.newtab) {
            $(`.whiteboard-container`).toggleClass('active')
        } else {
            var win = window.open(`${SOCKETURL}?id=${meetingname}`);
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please Open Your Whiteboard');
            }
        }
    }

    function checkScreenShare() {

        let screen = false;
        const participants = room.getParticipants();

        participants.map((participant) => {
            let tracks = participant._tracks;
            tracks.map((track) => {
                if (track.getType() === "video") {
                    if (track.videoType === "desktop") {
                        screen = true;
                    }
                }
            })
        })

        return screen;
    }

    function kickOutUser(id) {
        // alert(id);
        socket.emit("call-to-backend", { action: "kick-out-user", data: { userId: id } });
    }

    function kickOutUserHandler(data) {
        let id = room.myUserId();
        if (id === data.userId) {
            unload();
        }

    }

    useEffect(() => {
        socket = io(SOCKETURL);
        if (socket) {
            socketHandler();
        }
        startMeeting();
    }, [])


    useEffect(() => {
        socket.on("call-to-frontend", ({ action, data }) => {
            let localId = localTracks[0] && localTracks[0].getParticipantId();
            switch (action) {
                case "remote-audio-toggle":

                    if (localId === data.id) {
                        audioVideoHandler("audio");
                    }
                    break;
                case "remote-video-toggle":
                    if (localId === data.id) {
                        audioVideoHandler("video");
                    }
                    break;
                case "share-screen":
                    shareScreenHandler(data);
                    break;
                case "whiteboard":
                    whiteboardHandler(data.whiteboard, true)
                    break;
                case "endmeeting-for-all":
                    unload();
                case "kick-out-user":
                    kickOutUserHandler(data);
                default:
                    break;
            }
        })
    }, [])

    return (
        <>
            <div className="meeting-content-wrapper chat">
                <div className="meeting-container meeting-content">
                    <div className="screen-container meeting-container">
                        <Screen
                            meetingname={meetingname}
                            userrole={userrole}
                            whiteboard={whiteboard}
                        />
                    </div>
                    <div className="bottom-toolbox-container meeting-container">
                        <BottomToolbox
                            chatFeatures={chatFeatures}
                            userrole={userrole}
                            whiteboard={whiteboard}
                            shareScreenFeature={shareScreenFeature}
                            audioVideoHandler={audioVideoHandler}
                            shareScreen={shareScreen}
                            settingHandler={settingHandler}
                            whiteboardHandler={whiteboardHandler}
                            layoutHandler={layoutHandler}
                            participantList={participantList}
                            unload={unload}
                            kickOutUser={kickOutUser}
                            refreshUserList={refreshUserList}
                        />
                    </div>
                </div>
                <div className="chat-container meeting-container">
                    <Chat
                        chatFeatures={chatFeatures}
                        meetingname={meetingname}
                        username={username}
                        participantList={participantList}
                        localUserId={localUserId} />
                </div>
            </div>
        </>
    )

}

export default Meeting;