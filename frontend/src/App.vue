<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";


const data = ref(null);
const imageUrl = ref(null);

const makeFetch = async () => {
  const response = await axios.post('http://localhost:3000/getimage', {
    text:"a supercar"
  });
  imageUrl.value = "data:image/png;base64," + response.data.imageBase64;
}

onMounted(() => {
  makeFetch()
})

</script>

<template>
  <div class="prompt_wrapper">
    <div>
      <p>
        Clear Project
      </p>
      <div>
        <img :src="imageUrl" alt="Image">
      </div>
    </div>
  </div>
  
</template>

<style scoped>

</style>
