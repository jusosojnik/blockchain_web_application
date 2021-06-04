<template>
  <div class="home">
    <HomeButton :text="'go home'" :link="'/'"/>
  </div>
  <div class="container">
    <form @submit.prevent="Login" class='login-form'>
      <div class="flex-row">
        <input id="email" class='lf--input' placeholder='Email' type='text' v-model="email">
      </div>
      <div class="flex-row">
        <input id="password" class='lf--input' placeholder='Password' type='password' v-model="password">
      </div>
      <input class='lf--submit' type='submit' value='LOGIN'>
    </form>
    <!--<a class='lf--forgot' href='#'>Forgot password?</a>-->
  </div>
</template>

<script>

import HomeButton from "../components/HomeButton";
import {ref} from 'vue';
import firebase from "firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Login = () => {
      firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(data => console.log(data))
          .catch(err => alert(err.message));
    }

    return {
      Login,
      email,
      password
    }
  },
  name: "Login",
  components: {
    HomeButton,
  }
}

</script>

<style scoped lang="scss">
* {
  color: #e100ff;
  font-size: 24px;
  text-align: center;
}

.home {
  width:100%;
  padding-top: 2%;
  display: flex;
  justify-content: center;
}

$left-color:  #242e4d;
$right-color: #15154b;
$green-dark:  #e100ff;
$green-light: #0d35f3;
$gray: #2d2b2b;
$gray-light: #333338;

* {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

html, body { height: 100%; }


.login-form {
  width: 100%;
  padding: 2em;
  position: relative;
  background: #071053;

  &:before {
    content: '';
    position: absolute;
    top: -2px; left: 0;
    height: 2px; width: 100%;

    background: linear-gradient(
            to right,
            $green-dark,
            $green-light
    );
  }

  @media screen and (min-width: 600px) {
    width: 50vw;
    max-width: 15em;
  }
}

.flex-row {
  display: flex;
  margin-bottom: 1em;
}

.lf--label {
  width: 2em;
  display: flex;
  align-items: center;
  justify-content: center;

  background: $gray-light;
  cursor: pointer;
}
.lf--input {
  flex: 1;
  padding: 1em;
  border: 0;
  color: #e100ff;
  font-size: 1rem;

  &:focus {
    outline: none;
    transition: transform .15s ease;
    transform: scale(1.1);
  }
}

.lf--submit {
  display: block;
  padding: 1em;
  width: 100%;

  background: linear-gradient(
          to right,
          $green-dark,
          $green-light
  );
  border: 0;
  color: #e100ff;
  cursor: pointer;
  font-size: .75em;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(black, .2);

  &:focus {
    outline: none;
    transition: transform .15s ease;
    transform: scale(1.1);
  }
}

.lf--forgot {
  margin-top: 1em;
  color: $green-light;
  font-size: .65em;
  text-align: center;
  position: relative;
}

::placeholder { color: white; }

.container {
  position: absolute;
  top: 40%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

input {
  background: black;
}
</style>
