import React, { Component } from "react";
import io from "socket.io-client";
import faker from "faker";
import CancelIcon from "@material-ui/icons/Cancel";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { IconButton, Badge, Input, Button } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatIcon from "@material-ui/icons/Chat";
import EmailIcon from "@material-ui/icons/Email";
import { message } from "antd";
import "antd/dist/antd.css";
import { Row } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import "./Video.css";
import Sidebar from "./Components/Sidebar";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import Header from "./Components/Header";
import Transcription from "./Transcription";
import CloseIcon from "@material-ui/icons/Close";
import { ReactMediaRecorder } from "react-media-recorder";
import { useReactMediaRecorder } from "react-media-recorder";
import db from "./Components/Pages/firebase";
import { useStateValue } from "./Components/Pages/StateProvider";
import firebase from "firebase";
init("user_1Zs7LFbYpLUQXCXOnytsf");

const server_url =
  process.env.NODE_ENV === "production"
    ? "https://video.sebastienbiollo.com"
    : "http://localhost:4001";

var connections = {};
const peerConnectionConfig = {
  iceServers: [
    // { 'urls': 'stun:stun.services.mozilla.com' },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
var socket = null;
var socketId = null;
var elms = 0;

//getting all video link urls
const getAllEvents = async () => {
 var site = window.location.href.toString();
 
  var site_length=site.length;
  for(var m=0;m<site_length;m++)
  {
    if(site.charAt(m)==="a")
    {
      var position=m;
      var value=site.substring(m+4,m+10);
    }
 
  }
 
  const query_snap = await db
    .collection("meetingLink")
    .where("meetingUrl", "==", value)
    .get();

  if (!query_snap.size) throw new Error("No meeting link found");


  // Meeting Document
  const meeting_link = query_snap.docs[0].data();
  return meeting_link;
};

function showRecorder() {
  alert("Please allow sharing to start recording.");
  if (document.getElementById("recording-div").style.display === "none") {
    document.getElementById("recording-div").style.display = "block";

    const RecordView = () => {
      const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ video: true });
    };
  } else {
    document.getElementById("recording-div").style.display = "none";
  }
}

//Mailing

function Close() {
  if (document.getElementById("email_form") != null) {
    document.getElementById("email_form").style.display = "none";
    document.getElementById("recording-div").style.zIndex = "9999";
  }
}

function CloseRecorder() {
  if (document.getElementById("recording-div") != null) {
    document.getElementById("recording-div").style.display = "none";
  }
}

function sendEmail(e) {
  e.preventDefault();

  emailjs
    .sendForm(
      "default_service",
      "template_b131t2m",
      e.target,
      "user_1Zs7LFbYpLUQXCXOnytsf"
    )
    .then(
      (result) => {
        alert("Link has been sent!");
        document.getElementById("email_form").style.display = "none";
      },
      (error) => {
        console.log(error.text);
      }
    );
}

function showMail() {
  if (document.getElementById("email_icon") != null) {
    if (document.getElementById("email_form").style.display === "none") {
      document.getElementById("email_form").style.display = "block";
    } else {
      document.getElementById("email_form").style.display = "none";
    }
  }
}

class Video extends Component {
  constructor(props) {
    super(props);

    this.localVideoref = React.createRef();

    this.videoAvailable = false;
    this.audioAvailable = false;

    this.state = {
      video: false,
      audio: false,
      screen: false,
      showModal: false,
      screenAvailable: false,
      messages: [],
      message: "",
      newmessages: 0,
      askForUsername: true,
      username: faker.internet.userName(),
    };
    connections = {};

    this.getPermissions();
  }

  getPermissions = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => (this.videoAvailable = true))
        .catch(() => (this.videoAvailable = false));

      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => (this.audioAvailable = true))
        .catch(() => (this.audioAvailable = false));

      if (navigator.mediaDevices.getDisplayMedia) {
        this.setState({ screenAvailable: true });
      } else {
        this.setState({ screenAvailable: false });
      }

      if (this.videoAvailable || this.audioAvailable) {
        navigator.mediaDevices
          .getUserMedia({
            video: this.videoAvailable,
            audio: this.audioAvailable,
          })
          .then((stream) => {
            window.localStream = stream;
            this.localVideoref.current.srcObject = stream;
          })
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  getMedia = () => {
    this.setState(
      {
        video: this.videoAvailable,
        audio: this.audioAvailable,
      },
      () => {
        this.getUserMedia();
        this.connectToSocketServer();
      }
    );
  };

  getUserMedia = () => {
    if (
      (this.state.video && this.videoAvailable) ||
      (this.state.audio && this.audioAvailable)
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: this.state.video, audio: this.state.audio })
        .then(this.getUserMediaSuccess)
        .then((stream) => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = this.localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              video: false,
              audio: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              for (let id in connections) {
                connections[id].addStream(window.localStream);

                connections[id].createOffer().then((description) => {
                  connections[id]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        id,
                        JSON.stringify({
                          sdp: connections[id].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                });
              }
            }
          );
        })
    );
  };

  getDislayMedia = () => {
    if (this.state.screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(this.getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  };

  getDislayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              screen: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              this.getUserMedia();
            }
          );
        })
    );
  };

  gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketId) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  changeCssVideos = (main) => {
    let widthMain = main.offsetWidth;
    let minWidth = "30%";
    if ((widthMain * 30) / 100 < 300) {
      minWidth = "300px";
    }
    let minHeight = "40%";

    let height = String(100 / elms) + "%";
    let width = "";
    if (elms === 0 || elms === 1) {
      width = "100%";
      height = "100%";
    } else if (elms === 2) {
      width = "45%";
      height = "100%";
    } else if (elms === 3 || elms === 4) {
      width = "35%";
      height = "50%";
    } else {
      width = String(100 / elms) + "%";
    }

    let videos = main.querySelectorAll("video");
    for (let a = 0; a < videos.length; ++a) {
      videos[a].style.minWidth = minWidth;
      videos[a].style.minHeight = minHeight;
      videos[a].style.setProperty("width", width);
      videos[a].style.setProperty("height", height);
    }

    return { minWidth, minHeight, width, height };
  };

  connectToSocketServer = () => {
    socket = io.connect(server_url, { secure: true });

    socket.on("signal", this.gotMessageFromServer);

    socket.on("connect", () => {
      socket.emit("join-call", window.location.href);
      socketId = socket.id;

      socket.on("chat-message", this.addMessage);

      socket.on("user-left", (id) => {
        let video = document.querySelector(`[data-socket="${id}"]`);
        if (video !== null) {
          elms--;
          video.parentNode.removeChild(video);

          let main = document.getElementById("main");
          this.changeCssVideos(main);
        }
      });

      socket.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConnectionConfig
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socket.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            // TODO mute button, full screen button
            var searchVidep = document.querySelector(
              `[data-socket="${socketListId}"]`
            );
            if (searchVidep !== null) {
              // if i don't do this check it make an empyt square
              searchVidep.srcObject = event.stream;
            } else {
              elms = clients.length;
              let main = document.getElementById("main");
              let cssMesure = this.changeCssVideos(main);

              let video = document.createElement("video");

              let css = {
                minWidth: cssMesure.minWidth,
                minHeight: cssMesure.minHeight,
                maxHeight: "100%",
                margin: "10px",
                borderStyle: "solid",
                borderColor: "#bdbdbd",
                objectFit: "fill",
              };
              for (let i in css) video.style[i] = css[i];

              video.style.setProperty("width", cssMesure.width);
              video.style.setProperty("height", cssMesure.height);
              video.setAttribute("data-socket", socketListId);
              video.srcObject = event.stream;
              video.autoplay = true;
              video.playsinline = true;

              main.appendChild(video);
            }
          };

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([this.black(...args), this.silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketId) {
          for (let id2 in connections) {
            if (id2 === socketId) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socket.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  handleVideo = () =>
    this.setState({ video: !this.state.video }, () => this.getUserMedia());
  handleAudio = () =>
    this.setState({ audio: !this.state.audio }, () => this.getUserMedia());
  handleScreen = () =>
    this.setState({ screen: !this.state.screen }, () => this.getDislayMedia());

  handleEndCall = () => {
    try {
      let tracks = this.localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {}
    window.location.href = "/";
  };

  openChat = () => this.setState({ showModal: true, newmessages: 0 });
  closeChat = () => this.setState({ showModal: false });
  handleMessage = (e) => this.setState({ message: e.target.value });

  addMessage = (data, sender, socketIdSender) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, { sender: sender, data: data }],
    }));
    if (socketIdSender !== socketId) {
      this.setState({ newmessages: this.state.newmessages + 1 });
    }
  };

  handleUsername = (e) => this.setState({ username: e.target.value });

  sendMessage = () => {
 

    getAllEvents().then((meetingLink) => {
      var meeting_link_data = JSON.stringify(meetingLink);
      var length = meeting_link_data.length;

      for (var n = 0; n < length; n++) {
        if (meeting_link_data.charAt(n) === "f") var pos = n;
        var link = meeting_link_data.substring(pos, pos + 7);
        if (link === "fullUrl") {
          var roomId = meeting_link_data.substring(pos + 16, pos + 36);
          socket.emit("chat-message", this.state.message, this.state.username);

          //Enter message in normal chat db
          db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add({
              message: this.state.message + " ~" + this.state.username,
              name: this.state.username,
              photo:
                "https://thumbs.dreamstime.com/b/video-call-online-meeting-education-webinar-support-flat-color-line-icon-vector-web-conference-symbol-sign-illustration-design-161479140.jpg",
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });

          this.setState({ message: "", sender: this.state.username });
          break;
        }
      }
    });
  };

  copyUrl = () => {
    let text = window.location.href;
    if (!navigator.clipboard) {
      let textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        alert("Link copied to clipboard!");
      } catch (err) {
        message.error("Failed to copy");
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        alert("Link copied to clipboard!");
      },
      () => {
        message.error("Failed to copy");
      }
    );
  };

  connect = () =>
    this.setState({ askForUsername: false }, () => this.getMedia());

  render() {
    return (
      <div>
        <Header />
        <div id="video_page">
          <Sidebar />
          {this.state.askForUsername === true ? (
            <div id="video_div">
              <div
                style={{
                  width: "30%",
                  height: "auto",
                  padding: "20px",
                  minWidth: "400px",
                  textAlign: "center",
                  margin: "auto",
                  marginTop: "50px",
                  justifyContent: "center",
                }}
              >
                <PersonPinIcon id="person_icon" style={{ fontSize: 70 }} />
                <p id="call_heading">Set your username</p>
                <Input
                  id="input_name"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={(e) => this.handleUsername(e)}
                />
                <Button id="video_button" onClick={this.connect}>
                  Connect
                </Button>
              </div>

              <div
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  paddingTop: "5px",
                }}
              >
                <video
                  id="my-video"
                  ref={this.localVideoref}
                  autoPlay
                  muted
                  style={{
                    borderStyle: "solid",
                    borderColor: "#bdbdbd",
                    objectFit: "fill",
                    height: "40vh",
                    borderRadius: "25px",
                  }}
                ></video>
              </div>
            </div>
          ) : (
            <div>
              <Modal
                show={this.state.showModal}
                onHide={this.closeChat}
                style={{ zIndex: "999999" }}
              >
                <Modal.Header
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,#4d4e72,  #b1b2e4)",
                  }}
                  closeButton
                >
                  <Modal.Title style={{ color: "white" }}>
                    Chat Room
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{
                    overflow: "auto",
                    overflowY: "auto",
                    height: "400px",
                    textAlign: "left",
                  }}
                >
                  {this.state.messages.length > 0 ? (
                    this.state.messages.map((item, index) => (
                      <div key={index} style={{ textAlign: "left" }}>
                        <p style={{ wordBreak: "break-all" }}>
                          <b>{item.sender}</b>: {item.data}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No message yet</p>
                  )}
                </Modal.Body>
                <Modal.Footer className="div-send-msg">
                  <Input
                    placeholder="Message"
                    value={this.state.message}
                    onChange={(e) => this.handleMessage(e)}
                  />
                  <br />
                  <Button id="connect_button" onClick={this.sendMessage}>
                    Send
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="btn-down">
                <IconButton
                  style={{ color: "black" }}
                  onClick={this.handleVideo}
                >
                  {this.state.video === true ? (
                    <VideocamIcon />
                  ) : (
                    <VideocamOffIcon />
                  )}
                </IconButton>

                <IconButton
                  style={{ color: "#f44336" }}
                  onClick={this.handleEndCall}
                >
                  <CallEndIcon />
                </IconButton>

                <IconButton
                  style={{ color: "black" }}
                  onClick={this.handleAudio}
                >
                  {this.state.audio === true ? <MicIcon /> : <MicOffIcon />}
                </IconButton>

                {this.state.screenAvailable === true ? (
                  <IconButton
                    style={{ color: "black" }}
                    onClick={this.handleScreen}
                  >
                    {this.state.screen === true ? (
                      <ScreenShareIcon />
                    ) : (
                      <StopScreenShareIcon />
                    )}
                  </IconButton>
                ) : null}

                <Badge
                  badgeContent={this.state.newmessages}
                  max={999}
                  color="secondary"
                  onClick={this.openChat}
                >
                  <IconButton
                    style={{ color: "black" }}
                    onClick={this.openChat}
                  >
                    <ChatIcon />
                  </IconButton>
                </Badge>
              </div>

              <div id="video_container">
                <div
                  className="container"
                  style={{ marginLeft: "13vh", width: "93vw" }}
                >
                  <div style={{ paddingTop: "9vh" }}>
                    <Input
                      value={window.location.href}
                      id="link"
                      readonly
                    ></Input>
                    <Button id="connect_button" onClick={this.copyUrl}>
                      Copy invite link
                    </Button>
                    <EmailIcon
                      id="email_icon"
                      onClick={showMail}
                      style={{
                        marginLeft: "1rem",
                        marginTop: "0.5rem",
                        fontSize: 35,
                      }}
                    />

                    <Button id="recorder_button" onClick={showRecorder}>
                      Record
                    </Button>

                    <div id="recorder">
                      <ReactMediaRecorder
                        screen
                        render={({
                          status,
                          startRecording,
                          stopRecording,
                          mediaBlobUrl,
                        }) => (
                          <div
                            style={{ position: "fixed", display: "none" }}
                            id="recording-div"
                          >
                            <button onClick={startRecording} id="start-button">
                              Start
                            </button>

                            <button onClick={stopRecording} id="stop-button">
                              Stop
                            </button>

                            <Input
                              type="text"
                              placeholder="Blob URL"
                              value={mediaBlobUrl}
                              readOnly
                              style={{ border: "none" }}
                            />
                            <CloseIcon
                              id="closerecorder_button"
                              style={{ marginLeft: "0.5rem", fontSize: 25 }}
                              onClick={CloseRecorder}
                            />
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div id="transcription-container">
                    <Transcription />
                  </div>
                  {/*Email form */}

                  <div id="email_form" style={{ display: "none" }}>
                    <form
                      className="contact-form"
                      style={{ marginTop: "0.3rem" }}
                      onSubmit={sendEmail}
                    >
                      <h5 style={{ marginLeft: "5.5rem", color: "white" }}>
                        Invite
                        <CloseIcon
                          id="close_button"
                          style={{ marginLeft: "4.5rem", fontSize: 25 }}
                          onClick={Close}
                        />
                      </h5>
                      <label style={{ color: "white" }}>Name: </label>
                      <input
                        className="form_input"
                        type="text"
                        name="to_name"
                      />
                      <br />

                      <label style={{ color: "white" }}>Email: </label>
                      <input
                        className="form_input"
                        type="email"
                        style={{ marginLeft: "0.5rem" }}
                        name="to_email"
                      />
                      <br />
                      <label style={{ color: "white" }}>Link: </label>
                      <input
                        className="form_input"
                        name="message"
                        style={{ marginLeft: "1rem" }}
                        value={window.location.href}
                        readonly
                      />

                      <input type="submit" value="Send" id="send_button" />
                    </form>
                  </div>

                  <Row
                    id="main"
                    className="flex-container"
                    style={{ margin: 0, padding: 0 }}
                  >
                    <video
                      id="my-video"
                      playsinline
                      autoplay
                      muted
                      ref={this.localVideoref}
                      autoPlay
                      muted
                      style={{
                        border: "solid 2px",
                        borderColor: "#b7a9f5",
                        margin: "10px",
                        objectFit: "fill",
                        width: "100%",
                        height: "100%",
                      }}
                    ></video>

                    <pre id="log"></pre>
                  </Row>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Video;
