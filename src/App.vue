<template>
  <form @submit.prevent="sendPostRequest">
    <label for="title">Title:</label>
    <input type="text" id="title" v-model="title">
    <label for="body">Body:</label>
    <textarea id="body" v-model="body"></textarea>
    <button type="submit">Submit</button>
  </form>
  <img v-bind:src="'data:image/jpeg;base64,'+base64String" />
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';


const base64String = ref(''); // Replace with your Base64 string
const title = ref('');
const body = ref('');
const tags = ref([{
  text: "Cat in space"
}]);

const sendPostRequest = async () => {
  const endpoint = 'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image';
  const token = 'sk-m6d25QqF4hDQOMkzNZ4gb7PUmvgBI42s8D7M6qV8mjKBIWxe'; // Replace with your bearer token
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
  } catch (error) {
    console.error('Error:', error.message);
  }
}
</script>
