<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
const listOfUsers = ref([]);

let user = {
  name: '',
  age: 0,
  username: ''
}

const createUser = () => {
  axios.post('http://localhost:3001/createUser', {
    name: user.name,
    age: user.age,
    username: user.username
  })
    .then(response => {
      alert('User created successfully');
    })
    .catch(error => {
      console.error(error);
    });
}

onBeforeMount(() => {
  axios.get('http://localhost:3001/getUsers')
    .then(response => {
      listOfUsers.value = response.data;
    })
    .catch(error => {
      console.error(error);
    });
})
</script>

<template>
<div class="users-display">
  <h1>Users</h1>
  <ul>
    <li v-for="user in listOfUsers" :key="user.id">
      <p>{{ user.name }}</p>
      <p>{{ user.age }}</p>
      <p>{{ user.username }}</p>
    </li>
  </ul>
</div>

<div>
  <input type="text" placeholder="Name" v-model="user.name"/>
  <input type="Number" placeholder="Age" v-model="user.age" />
  <input type="text" placeholder="Username" v-model="user.username" />
  <button v-if="user" @click="createUser()">Create User</button>
</div>
</template>

<style scoped>

</style>
