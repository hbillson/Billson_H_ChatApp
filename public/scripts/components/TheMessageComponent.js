export default {
    props: ['msg', 'socketid'],

    data: function() {
        return {
            msg: this.msg,
            name: this.msg.name,
        }
    },

    template: `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <p><span class="name">{{msg.name}}:</span></p>
        <p>{{msg.content}}</p>
    </article>`,

    mounted: function() {
        var thismsg = this.$el;
        thismsg.classList.add("fade-in-slide");
    },
    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}