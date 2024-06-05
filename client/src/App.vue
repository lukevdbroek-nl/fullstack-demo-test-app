<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
const listOfUsers = ref([]);

let user = {
  name: '',
  age: 0,
  username: ''
}

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'x-api-key': import.meta.env.VITE_MAIN_API_KEY
  }
});

const createUser = () => {
  instance.post('http://localhost:3001/api/createUser', {
    name: user.name,
    age: user.age,
    username: user.username
  })
  .then(response => {
    alert('User created successfully');
    // Optionally, refresh the list of users after creating a new user
  })
  .catch(error => {
    console.error(error);
  });
}

onBeforeMount(() => {
  instance.get('http://localhost:3001/api/getUsers')
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
