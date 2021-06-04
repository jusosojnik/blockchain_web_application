<template>
  <div class="nav">
    <ul>
      <li v-if="!auth"><router-link to="/login">login</router-link></li>
      <li v-if="!auth"><router-link to="/register">register</router-link></li>
      <li @click="Logout" v-if="auth"><a href="#">logout</a></li>
      <!--<li><router-link to="/">home</router-link></li>-->
      <li v-if="auth"><router-link to="/wallet">my wallets</router-link></li>
      <li><router-link to="/about">about</router-link></li>
    </ul>
  </div>

</template>

<script>
import { ref, onBeforeMount } from "vue";
import firebase from 'firebase';

export default {
  setup() {
    const user = firebase.auth().currentUser

    const name = ref("");

    onBeforeMount(() => {
      if (user) {
        //name.value = user.email.split('@')[0];
        //this.auth = true
      } else {
        //this.auth = false
      }
    });

    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Signed"))
        .catch(err => alert(err.message))
    }

    return {
      name,
      Logout
    }
  },
  name: 'Header',
  components: {
  },
  props: {
    auth: Boolean,
  }
}
</script>

<style lang="scss">
// https://picular.co/bluemoon

@import url("https://fonts.googleapis.com/css?family=Raleway:400,400i,700");

.nav {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

ul {
  display: flex;
  flex-direction: column;
  align-items: start;
  list-style-type: none;

  li {
    padding: 6px 0;

    a {
      --fill-color: #0d35f3;
      position: relative;
      display: block;
      padding: 4px 0;
      font: 700 3rem Raleway, sans-serif;
      text-decoration: none;
      text-transform: uppercase;
      -webkit-text-stroke: 2px var(--fill-color);
      background: linear-gradient(var(--fill-color) 0 100%) left / 0 no-repeat;
      color: transparent;
      background-clip: text;
      transition: 0.5s linear;

      :hover {

      }
      &:hover {
        --fill-color: #e100ff;
        background-size: 150%;
      }
    }
  }
}
</style>
