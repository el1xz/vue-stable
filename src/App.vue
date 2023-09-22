<script setup>
import axios from "axios";
import {ref} from "vue";


const imageUrl = ref(null);
const image = ref(null);
const generatePromt = ref(null);

const url = "https://api.segmind.com/v1/sd1.5-paragon";
const api_key = "SG_6b5964f90a8b5e73";

const data = {
  "prompt": "cinematic film still, 4k, realistic, ((cinematic photo:1.3)) of panda wearing a blue spacesuit, sitting in a bar, Fujifilm XT3, long shot, ((low light:1.4)), ((looking straight at the camera:1.3)), upper body shot, somber, shallow depth of field, vignette, highly detailed, high budget Hollywood movie, bokeh, cinemascope, moody, epic, gorgeous, film grain, grainy",
  "negative_prompt": "ugly, tiling, poorly drawn hands, poorly drawn feet, poorly drawn face, out of frame, extra limbs, disfigured, deformed, body out of frame, blurry, bad anatomy, blurred, watermark, grainy, signature, cut off, draft",
  "style": "base",
  "samples": 1,
  "scheduler": "UniPC",
  "num_inference_steps": 25,
  "guidance_scale": 8,
  "strength": 0.2,
  "seed": -1,
  "img_width": 512,
  "img_height": 512,
  "refiner": true,
  "high_noise_fraction": 0.8,
  "base64": false
};

const makeFetch = async () => {
  try {
    const response = await axios.post(url, data, {
      responseType: "arraybuffer",
      headers: {
        'x-api-key': api_key
      }
    });
    console.log(response);
    const b64 = btoa(String.fromCharCode(...new Uint8Array(response.data)));
    const imgData = "data:" + response.headers['content-type'] + ";base64," + b64;
    imageUrl.value = imgData;
    image.value = response.data;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="prompt_wrapper">
    <div>
      <div>
        <img :src="imageUrl" alt="Image">
      </div>
      <div>
        <img :src="image" alt="Image2">
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
