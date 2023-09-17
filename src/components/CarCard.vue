<template>
  <!-- NOTE router links to pages with params, need the params filled out or you will get an error when the link tries to load -->
  <router-link :to="{ name: 'Car Details', params: { carId: car.id } }">
    <div class="card car-card bg-light lighten-2 elevation-2">
      <section class="row">
        <div class="col-6"><img class="car-image" :src="car.imgUrl" alt=""></div>

        <div class="col-6">
          {{ car.make }} {{ car.model }} {{ car.year }}
          <div class="w-100 color" :style="`background-color: ${car.color || '#fff'};`"></div>
        </div>
      </section>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Car } from '../models/Car.js';


export default {
  props: { car: { type: Car, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped>
.car-card {
  height: 20vh;
  overflow: hidden;
  transition: all .1s ease;
  cursor: pointer;

  &:hover {
    transition: all .2s ease;
    transform: scale(1.05);
  }
}

.car-image {
  height: 20vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.color {
  height: 50px;
}
</style>
