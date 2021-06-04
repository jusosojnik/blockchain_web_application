<template>
  <router-view/>
</template>

<script>
import {onBeforeMount} from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase";
import app from './main.js'

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    let isLogged = false

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          app.$auth = false
          app.$currentUser = 'nc'
          router.replace('/login');
        } else if (route.path == '/login' || route.path == '/register') {
          app.$auth = true
          app.$currentUser = user.email
          router.replace('/');
        }
      });
    });
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Source Code Pro", monospace;
}

</style>
