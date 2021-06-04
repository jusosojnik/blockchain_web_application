<template>
  <Navbar :auth="isAuth"/>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import {ref, onBeforeMount, inject} from "vue";
import firebase from 'firebase';
import {useRoute, useRouter} from "vue-router";
import app from '../main.js'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      isAuth: app.$auth
    }
  },
  mounted() {

  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    let isLogged = false

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          app.$auth = false
          console.log(app.$auth)
        } else {
          app.$auth = true
          console.log(app.$auth)
        }
      });
    });
  },
  /*beforeCreate: function() {
    //console.log(this.$auth)
    //this.$auth = true
  }*/
}
</script>
