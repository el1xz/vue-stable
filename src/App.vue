<template>
  <div class="promt_wrapper">
    <div class="input_container">
      <input v-model="name" type="text">
      <p v-if="warning">Заполните поле</p>
    </div>
    <button @click="sendPostRequest">
      Generate
    </button>
    <div class="img_container">
      <img v-if="base64String" v-bind:src="'data:image/jpeg;base64,' + base64String" />
      <div v-if="skeleton" class="skeleton_loader skeleton">
      </div>
    </div>
  </div>
  
</template>

<style scoped>
.input_container input{
  width: 100%;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 4px;
  padding: 8px;
}
.promt_wrapper button{
  background-color: black;
  border-radius: 8px;
  color: white;
  padding: 8px 0px 8px 0px;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
}
.skeleton_loader {
  position: absolute;
  z-index: 2;
  top: 0;
  width: 200px;
  height: 200px;
}

.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
.img_container {
  width: 200px;
  height: 200px;
  overflow: hidden;
}
.img_container img {
  width: 100%;
}
.promt_wrapper {
  padding-top: 20%;
  margin: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

<script setup>
import axios from 'axios';
import { ref } from 'vue';


const base64String = ref(''); // Replace with your Base64 string
const body = ref('');
const name = ref('');
const skeleton = ref();
const warning = ref(null);
const tags = ref([
  {
    text: name
  }
]);

const sendPostRequest = async () => {
  skeleton.value = true;
  warning.value = '';
  const endpoint = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image';
  const token = process.env.VUE_APP_STABLE_SECRET_API; // Replace with your bearer token
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const data = { text_prompts: tags.value };

  try {
    const response = await axios.post(endpoint, data, { headers });
    console.log('Response:', response.data);
    base64String.value = response.data.artifacts[0].base64;
    console.log(base64String.value);
    skeleton.value = false;
  } catch (error) {
    warning.value = error.message;
    skeleton.value = false;
    console.error('Error:', error.message);
  }
}
</script>
