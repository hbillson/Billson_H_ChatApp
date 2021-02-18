export default {
    props: ['name'],

    data: function() {
        return {
            name: this.name
        }
    },

    template: `
    <div class="notif-box">{{name}} has entered the chat.
    </div>`,

    mounted: function() {
        var thisnotif = this.$el;
        thisnotif.classList.add("fade-in-slide");

        setTimeout(() => {
            thisnotif.classList.add("fade-out");
        }, 1000);
        setTimeout(() => {
            thisnotif.classList.add("hidden");
        }, 2000);

    },
    data: function() {
        return {
        }
    }
}