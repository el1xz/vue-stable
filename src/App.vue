<script setup>
import axios from "axios";
import { watch, ref } from "vue";

import Button from "primevue/button";
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Skeleton from "primevue/skeleton";
import Dropdown from "primevue/dropdown";
import Slider from "primevue/slider";

const imageUrl = ref(null);
const generatePrompt = ref(null);
const negativePrompt = ref(
  "(deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation"
);
const scheduler = ref({
  name: "dpmpp_sde_ancestral",
});
const schedulers_list = ref([
  { name: "DDIM" },
  { name: "DPM Multi" },
  { name: "DPM Single" },
  { name: "Euler a" },
  { name: "Euler" },
  { name: "Heun" },
  { name: "DPM2 a Karras" },
  { name: "DPM2 Karras" },
  { name: "LMS" },
  { name: "PNDM" },
  { name: "DDPM" },
  { name: "UniPC" },
  { name: "dpmpp_sde_ancestral" },
  { name: "dpmpp_2m" },
]);

const pending = ref(false);

const url = "https://api.segmind.com/v1/sd1.5-dreamshaper";
const api_key = "SG_6b5964f90a8b5e73";

const width_slide = ref(512);
const height_slide = ref(512);

const data = ref({
  prompt: generatePrompt,
  negative_prompt: negativePrompt,
  style: "base",
  samples: 1,
  scheduler: scheduler.value?.name,
  num_inference_steps: 25,
  guidance_scale: 8,
  strength: 0.2,
  seed: -1,
  img_width: width_slide,
  img_height: height_slide,
  refiner: true,
  high_noise_fraction: 0.8,
  base64: false,
});

watch(scheduler, () => {
  data.value.scheduler = scheduler.value?.name;
});

const makeFetch = async () => {
  try {
    imageUrl.value = null;
    pending.value = true;
    const response = await axios.post(url, data.value, {
      responseType: "arraybuffer",
      headers: {
        "x-api-key": api_key,
      },
    });
    const b64 = btoa(String.fromCharCode(...new Uint8Array(response.data)));
    const imgData =
      "data:" + response.headers["content-type"] + ";base64," + b64;
    imageUrl.value = imgData;
    pending.value = false;
  } catch (error) {
    console.log(error);
    pending.value = false;
  }
};
</script>

<template>
  <div class="prompt_wrapper">
    <div>
      <div class="image">
        <Skeleton v-if="pending" width="100%" height="100%"></Skeleton>
        <Image
          v-if="imageUrl"
          :src="imageUrl"
          alt="Image"
          height="250"
          width="250"
          preview
        />
      </div>
      <div class="prompt">
        <Button @click="makeFetch" label="Generate" />
        <span class="p-float-label">
          <InputText id="prompt" type="text" v-model="generatePrompt" />
          <label for="prompt">prompt</label>
        </span>
        <span class="p-float-label">
          <InputText
            id="negative_prompt"
            type="text"
            v-model="negativePrompt"
          />
          <label for="negative_prompt">negative prompt</label>
        </span>
        <Dropdown
          v-model="scheduler"
          :optionValue="schedulers_list.name"
          :options="schedulers_list"
          optionLabel="name"
          placeholder="scheduler"
        />
      </div>
      <div class="slider_wrapper">
        <div class="slider_container">
          <label>WIDTH</label>
          <Slider
            v-model="width_slide"
            :min="512"
            :max="1024"
            :step="256"
            class="slider"
          />
          {{ width_slide }}
        </div>
        <div class="slider_container">
          <label>HEIGHT</label>
          <Slider
            v-model="height_slide"
            :min="512"
            :max="1024"
            :step="256"
            class="slider"
          />
          {{ height_slide }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prompt {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 5px;
  margin-top: 25px;
}
.image {
  width: 250px;
  height: 250px;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 5px;
  margin: 5px;
  overflow: hidden;
}

.slider {
  width: 300px;
}

.slider_wrapper {
  margin: 5px;
  padding: 5px;
}

.slider_container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
