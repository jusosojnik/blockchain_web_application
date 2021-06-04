import {createApp, onUnmounted, ref} from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyCRBfYTX2k3y_327CEQiGeXnA2_TlVVqRk",
    authDomain: "blockchain-wallet-bea38.firebaseapp.com",
    projectId: "blockchain-wallet-bea38",
    storageBucket: "blockchain-wallet-bea38.appspot.com",
    messagingSenderId: "21106030523",
    appId: "1:21106030523:web:9cca351dab9b26326af69e"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const usersCollection = db.collection('users');
const transactionsCollection = db.collection('transactions');

export const createUser = user => {
    return usersCollection.add(user);
}

export const createTransaction = transaction => {
    return transactionsCollection.add(transaction);
}

export const getUser = async id => {
    const user = await usersCollection.doc(id).get()
    return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user);
}

export const deleteUser = id => {
    return usersCollection.doc(id).delete();
}

export const useLoadUsers = () => {
    const users = ref([])
    usersCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    })
    onUnmounted(close)
    return users
}

export const useLoadTransactions = () => {
    const users = ref([])
    transactionsCollection.onSnapshot(snapshot => {
        users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
    })
    onUnmounted(close)
    return users
}


const app = createApp(App).use(router)
app.config.globalProperties.$auth = true
app.config.globalProperties.$currentUser = ''
app.mount('#app')

export default {
    name: 'App'
}
