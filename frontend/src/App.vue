<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";


const imageUrl = ref(null);
const generatePromt = ref(null);

const makeFetch = async () => {
  const response = await axios.post('http://localhost:3000/getimage', {
    text: generatePromt.value
  });
  imageUrl.value = "data:image/png;base64," + response.data.imageBase64;
}

</script>

<template>
  <div class="prompt_wrapper">
    <div>
      <div>
        <img :src="imageUrl" alt="Image">
      </div>
      <button @click="makeFetch">
        Generate Image
      </button>
      <input v-model="generatePromt" type="text">
    </div>
  </div>
  
</template>

<style scoped>

</style>
