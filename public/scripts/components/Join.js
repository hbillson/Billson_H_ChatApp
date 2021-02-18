export default {
    props: [],
    data: function() {
        return {
            username:"",
            nickname:"",
            password:""
        }
    },
    template: `
        <div><h4>Want to join the chat?<br/> Add a username and password!</h4>
        <h6>To remain anonymous, leave both fields empty.</h6>
        <form id="login">
            <input type="text" name="username" v-model="username"   placeholder="Create a username">
            <input type="text" name="nickname" v-model="nickname" placeholder="Create a nickname">
            <input type="password" name="password" v-model="password" placeholder="Create a password">
            <input type="submit" @click.prevent="processForm" value="JOIN" class="submit-button">
            <p>Already a user? <br>Log in <span onclick="logIn" class="login">here</span></p>
        </form>
    </div>`,

    mounted: ()=> {
       
    },

    methods: {
        processForm: function() {
            this.$emit("setuser", {username: this.username, nickname:this.nickname, password:this.password, view:"chat"});
        }
    }
}