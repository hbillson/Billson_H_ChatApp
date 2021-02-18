import JoinForm from "./components/Join.js";
import Chat from "./components/Chat.js";
import ChatMessage from "./components/TheMessageComponent.js";

(() => {
    const socket = io();

    function setUserId({sID, nickname}) {
        // incoming connected event with data
        vm.socketID = sID;
        vm.nickname = nickname;
    }

    function setName({name}) {
        vm.nickname = name;
    }

    function appendMessage(msg) {
        vm.messages.push(msg.message);
    }

    function appendNotif(user) {
        var notif = document.createElement("p")
        var node = document.createTextNode(`${user.name} has entered the chat.`);
        notif.appendChild(node);

        var notifBox = document.querySelector(".notif-box");
        notifBox.appendChild(notif);

        setTimeout(() => {
            fadeOut(notifBox);
        }, 1000)

    }

    function fadeOut(event) {
        event.style.opacity = "0";
    }

    function gone(event) {
        event.style.display = "none";
    }

    const vm = new Vue({
        data: {
            messages: [],
            userdata: {},
            nickname: "",
            username: "",
            password: "",
            socketID: "",
            message: "",
            view: "join",
            newView: "join"
        },

        computed: {
            currentComponent: function() {
                this.newView = this.view;
                return this.view;
            }
        },

        created: function() {
           
        },

        methods: {
            dispatchMessage(msg) {
                console.log(msg);
                socket.emit('chatmessage', {content: msg.message, name: msg.nickname, id: msg.id});
                this.message="";
            },

           setView(view) {
             //location.href = "/chat"
             console.log("going home");
             this.view = view;
            },

            thisUser: function(newUser) {
                //this.user = newUser;
                this.view = newUser.view;
                this.userdata = newUser;
                socket.emit('setname', {name:newUser.nickname});
            },

            userJoined(name) {
                socket.emit('new-joined', {name:name});
            },

            fadeOut: function(event) {
                console.log(event);
            }
        },

        components: {
            "join": JoinForm,
            "chat": Chat
        }

    }) .$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener("message", appendMessage);
    socket.addEventListener("set-name", setName);
    socket.addEventListener("notif", appendNotif);
})();