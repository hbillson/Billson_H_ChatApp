export default {
    props: ['msg', 'socketid'],

    data: function() {
        return {
            msg: this.msg
        }
    },

    template: `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <p @click="whisperTo"><span class="name">{{msg.name}}:</span></p>
        <p>{{msg.content}}</p>
    </article>`,

    mounted: function() {
        console.log(this.msg.content);
    },
    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    },

    methods: {
        whisperTo() {
            console.log(this.name);
        }
    }
}