<template>
    <router-link :to="{ name: 'House Details', params: { houseId: house.id } }">

        <div class="card house-card bg-light lighten-2 elevation-2">
            <section class="row">
                <div class="col-12 col-md-6"><img class="house-image" :src="house.imgUrl" alt=""> </div>

                <div class="col-6">
                    {{ house.year }} {{ house.price }} {{ house.description }}
                    <div Pclass="w-100"></div>
                </div>
            </section>
        </div>
    </router-link>
</template>

<script>
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { House } from '../models/House.js';
export default {
    props: { house: { type: House, required: true } },
    setup() {
        return {};
    },
};
</script>


<style>
.house-card {
    height: 20vh;
    overflow: hidden;
    transition: all .1s ease;
    cursor: pointer;

    &:hover {
        transition: all .2s ease;
        transform: scale(1.05);
    }
}

.house-image {
    height: 20vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.color {
    height: 50px;
}
</style>
