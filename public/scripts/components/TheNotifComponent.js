export default {
    props: ['name'],

    data: function() {
        return {
            name: this.name
        }
    },

    template: `
    <div class="notif-box"><p>{{name}} has entered the chat.</p>
    </div>`,

    mounted: function() {
        var thisnotif = this.$el;
        thisnotif.style.display="block";
        thisnotif.classList.add("fade-in-slide");

        setTimeout(() => {
            thisnotif.classList.add("fade-out");
        }, 1000);
        setTimeout(() => {
            thisnotif.style.display="none";
        }, 2000);

    },
    data: function() {
        return {
        }
    }
}