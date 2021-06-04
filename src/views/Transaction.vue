<template>
  <div class="home">
    <HomeButton :text="'go back'" :link="'/wallet'"/>
  </div>
  <div class="container">
    <form @submit.prevent="makeTransaction" class='login-form'>
      <label>FROM</label>
      <div class="flex-row">
        <input v-model="transaction.address1" id="email" class='lf--input' placeholder="Sender's Address" type='text'>
      </div>
      <label>TO</label>
      <div class="flex-row">
        <input v-model="transaction.address2" id="password" class='lf--input' placeholder="Receiver's Address" type='text'>
      </div>
      <label>AMOUNT</label>
      <div class="flex-row">
        <input v-model="transaction.amount" id="conf" class='lf--input' placeholder='Specified Amount' type='text'>
      </div>
      <input class='lf--submit' type='submit' value='CONFIRM TRANSACTION'>
    </form>
    <!--<a class='lf--forgot' href='#'>Forgot password?</a>-->
  </div>

  <div class="wallet">
    <p v-if="val">{{text}}</p>
    <table>
      <tr v-for="{ id, email, publicKey } in users" :key="id">
        <td class="key">{{ email }}</td>
        <br>
        <br>
        <td class="key">{{ publicKey }}</td>
        <td><button @click="getAddressBalance(publicKey)">show balance</button></td>
      </tr>
    </table>
  </div>
  <p>{{balance}}</p>
</template>

<script>
  import HomeButton from "@/components/HomeButton";
  import {onBeforeMount, reactive} from "vue";
  import firebase from "firebase";
  import app, {createTransaction, createUser, deleteUser, useLoadUsers} from "@/main";
  import axios from "axios";

  export default {
    name: 'Transaction',
    components: {
      HomeButton
    },
    setup() {
      let userEmail = ''
      const transaction = reactive({address1: '', address2: '', amount: 0})
      const form = reactive({email: '', publicKey: '', privateKey: ''})
      const torm = reactive({ from: '', to: '', amount: 0, confirmed: false })
      const users = useLoadUsers()
      let art = false
      const updateValue = (b) => {
        art = b
        console.log(art)
      }
      const makeTransaction = () => {
        console.log(transaction.address1)
        console.log(transaction.address2)
        console.log(transaction.amount)
        let pk1 = ''
        let pk2 = ''
        for (const user of users.value) {
          if (user.publicKey == transaction.address1) {
            pk1 = user.privateKey
          }
        }
        for (const user of users.value) {
          if (user.publicKey == transaction.address2) {
            pk2 = user.privateKey
          }
        }

        let data = transaction.address2 + " " + transaction.amount + " " + pk1
        console.log(data)
        axios.get("http://localhost:9000/mineBlock")
            .then((response) => {
              console.log(response.data)
              axios.post("http://localhost:9000/addTransaction", data)
                  .then((response) => {
                    let tmp = response.data
                    console.log(response.data)
                    axios.get("http://localhost:9000/mineBlock")
                        .then((response) => {
                          if (tmp == 'Transaction added') {
                            console.log(response.data)
                            torm.from = transaction.address1
                            torm.to = transaction.address2
                            torm.amount = transaction.amount
                            torm.confirmed = true
                            createTransaction({ ...torm })
                            updateValue(true)
                          } else {
                            console.log(response.data)
                            torm.from = transaction.address1
                            torm.to = transaction.address2
                            torm.amount = transaction.amount
                            torm.confirmed = false
                            createTransaction({ ...torm })
                            updateValue(false)
                          }
                        })
                        .catch((error) => {
                          console.log(error)
                          console.log(response.data)
                          torm.from = transaction.address1
                          torm.to = transaction.address2
                          torm.amount = transaction.amount
                          torm.confirmed = false
                          createTransaction({ ...torm })
                          updateValue(false)
                        })
                  })
                  .catch((error) => {
                    console.log(error)
                    console.log(response.data)
                    torm.from = transaction.address1
                    torm.to = transaction.address2
                    torm.amount = transaction.amount
                    torm.confirmed = false
                    createTransaction({ ...torm })
                    updateValue(false)
                  })
            })
            .catch((error) => {
              console.log(error)
              torm.from = transaction.address1
              torm.to = transaction.address2
              torm.amount = transaction.amount
              torm.confirmed = false
              createTransaction({ ...torm })
              updateValue(false)
            })

      }
      onBeforeMount(() => {
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user.email)
          app.$currentUser = user.email.toString()
          console.log(app.$currentUser)
          form.email = user.email
          //form.publicKey = Math.random().toString()
          //form.privateKey = Math.random().toString()
        });
      });
      return { form, users, userEmail, transaction, makeTransaction, torm, art }
    },
    methods: {
      getAddressBalance(address) {
        console.log(address)
        axios.post("http://localhost:9000/addressState", address)
            .then((response) => {
              console.log(response.data)
              this.balance = response.data
            })
            .catch((error) => console.log(error))
      }
    },
    data() {
      return {
        balance: null
      }
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
  display: flex;
  justify-content: center;
}

input {
  background: black;
}

.key {
  font-size: 20px;
}

.wallet {
  display: flex;
  justify-content: center;
}
p {
  text-align: center;
}
</style>
