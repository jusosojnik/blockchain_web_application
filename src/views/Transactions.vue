<template>
  <div class="about">
    <div class="home">
      <HomeButton :text="'go back'" :link="'/wallet'"/>
    </div>
    <div class="wallet">
      <table>
        <tr v-for="{ id, from, to, amount, confirmed } in transactions" :key="id">
          <td v-if="from == idU || to == idU">From </td>
          <td v-if="from == idU || to == idU">{{ from }}</td>
          <td v-if="from == idU || to == idU">To<br></td>
          <td v-if="from == idU || to == idU">{{ to }}</td>
          <td v-if="from == idU || to == idU">For amount of </td>
          <td v-if="from == idU || to == idU">{{ amount }}</td>
          <td v-if="from == idU || to == idU"> </td>
          <td v-if="from == idU || to == idU">{{ confirmed }}</td>
        </tr>
      </table>
    </div>
    <br>
    <br>
  </div>
</template>


<script>
import HomeButton from "../components/HomeButton";
import {useLoadTransactions, useLoadUsers} from "@/main";
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

export default {
  name: 'Transactions',
  components: {
    HomeButton,
  },
  setup() {
    const transactions = useLoadTransactions()
    console.log(transactions)
    const router = useRouter()
    const route = useRoute()
    const userId = computed(() => route.params.id)
    console.log(userId.value)
    const idU = userId.value
    console.log(idU)
    return { transactions, idU }
  }
}
</script>

<style scoped>
.home {
  width:100%;
  padding-top: 2%;
  display: flex;
  justify-content: center;
}
* {
  color: #e100ff;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 11px;
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
  font-size: 12px;
}
.del {
  font-size: 10px;
}
.key {
  font-size: 20px;
}
</style>
