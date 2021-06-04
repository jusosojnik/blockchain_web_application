<template>
  <div class="home">
    <HomeButton :text="'go home'" :link="'/'"/>
  </div>
  <br>
  <br>
  <br>
  <br>
  <br>
  <div class="btn">
    <HomeButton class="del" :text="'add wallet'" @click="onSubmit" :link="''"/>
  </div>
  <br>
  <p>WALLETS</p>
  <br>
  <div class="wallet">
    <table>
      <tr v-for="{ id, email, publicKey } in users" :key="id">
        <td v-if="email == userMail" class="key">{{ publicKey }}</td>
        <td v-if="email == userMail"><button @click="deleteWallet(id)">delete</button></td>
        <td v-if="email == userMail"><button @click="getAddressBalance(publicKey)">show balance</button></td>
        <td v-if="email == userMail"><router-link :to="`/transactions/${publicKey}`"><button>show transactions</button></router-link></td>
      </tr>
    </table>
  </div>
  <p>{{balance}}</p>
  <br>
  <br>
  <div class="home">
    <HomeButton class="trans" :text="'make a transaction'" :link="'/transaction'"/>
  </div>
</template>

<script>
import HomeButton from "@/components/HomeButton";
import app, {createUser, deleteUser, getUser, updateUser, useLoadUsers} from "../main";
import {useRoute, useRouter} from "vue-router";
import {reactive, computed, onMounted, onBeforeMount} from 'vue'
import firebase from "firebase";
const http = require('http');
import axios from 'axios';

export default {
  setup() {
    let userEmail = ''
    const form = reactive({ email: '', publicKey: '', privateKey: '' })
    let options = {
      host: 'localhost',
      port: '9000',
      path: '/newAddress'
    };

    const callback = function(response) {
      let str = '';

      //another chunk of data has been received, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been received, so we just print it out here
      response.on('end', function () {
        console.log(str);
        //http.request(options, callback).end();
      });
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


    const onSubmit = async () => {
      console.log(app.$currentUser)
      //http.request(options, callback).end();
      axios.get('http://localhost:9000/newAddress').then((response) => {
        form.publicKey = response.data.split('\n')[1]
        form.privateKey = response.data.split('\n')[0]
        createUser({ ...form })
      })
      .catch((error) => {
        console.log(error)
      })
    }

    const users = useLoadUsers()


    return { form, onSubmit, users, deleteUser, userEmail }
    /*const users = useLoadUsers()
    const router = useRouter()
    const route = useRoute()
    const userId = computed(() => route.params.id)
    const form = reactive({ publicKey: '', privateKey:'' })
    onMounted(async () => {
      const user = await getUser(userId.value)
      form.publicKey = user.publicKey
      form.privateKey = user.privateKey

    })

    const update = async () => {
      await updateUser(userId.value, { ...form })
      form.publicKey = ''
      form.privateKey = ''
    }

    return { users, deleteUser, form, update }*/
  },
  name: "Wallet",
  components: {
    HomeButton,
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
    },
    deleteWallet(id) {
      this.balance = null
      deleteUser(id)
    }
  },
  data() {
    return {
      userMail: app.$currentUser,
      balance: null
    }
  }
}
</script>

<style scoped>
  * {
    color: #e100ff;
    margin-left: 1%;
    margin-right: 1%;
    font-size: 24px;
    text-align: center;
  }
  .btn {
    display: flex;
    justify-content: center;
  }
  .home {
    padding-top: 2%;
    display: flex;
    justify-content: center;
  }
  td {
    display: flex;
    justify-content: center;
  }
  tr {
    display: flex;
    justify-content: center;
  }
  .wallet {
    display: flex;
    justify-content: center;
  }
  .del {
    font-size: 10px;
  }
  .key {
    font-size: 20px;
  }
</style>
