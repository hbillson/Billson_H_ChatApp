import ChatMessage from "./components/TheMessageComponent.js";

(() => {
    console.log('fired');

    //load the socket library and make a connection 

    const socket = io();

    function setUserId({sID, message}) {
        // incoming connected event with data
        vm.socketID = sID;
        console.log(sID);
    }

    function appendMessage(message) {
        vm.messages.push(message);
    }
    
    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
            message: "",
            socketID: ""    
        },

        created: function() {
            console.log("its alive!!");
        },

        methods: {
            dispatchMessage() {
                socket.emit('chatmessage', {content: this.message, name: this.nickname || "Anonymous"});
                this.message="";    
            }
        },

        components: {
            newmessage: ChatMessage
        }

    }) .$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener("message", appendMessage);
})();