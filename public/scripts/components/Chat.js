import ChatMessage from "./TheMessageComponent.js";
import Notification from "./TheNotifComponent.js";

export default {
    props: ['messagelist', 'socketid', 'user', 'notifications'],
    data: function() {
        return {
           message: "",
           messages: this.messagelist,
           socketID: this.socketid,
           name: this.user.nickname,
           notifs: this.notifications
        }
    },
    template: `
    <div id="container" class="chat">  
    <!--vue custom message component goes here-->
        <section class="messages">
            <ul id="notifs" v-for="notif in notifs">
                <notif :name="name"></notif>
            </ul>
            <ul id="messages" v-for="message in messages">
                <newmessage :msg="message" :socketid="socketID" :name="name"></newmessage>
            </ul>
        </section>

        <section class="message-wrapper">
            <div class="textbar">
                <textarea v-model="message" class="text-message"></textarea>
                <input @click.prevent="dispatchMessage" type="submit" value="SEND">
               
            </div>
            <p @click="goHome">LOG OUT</p>
        </section>
    </div>`,

    mounted: function() {
        this.$emit("joined", this.name);
    },

    methods: {
        goHome() {
            window.location.href="/";
        },

        dispatchMessage() {
            this.$emit("sendmessage", {message: this.message, nickname: this.name, id: this.socketID});
        }
    },

    components: {
        "newmessage": ChatMessage,
        "notif": Notification
    }
}