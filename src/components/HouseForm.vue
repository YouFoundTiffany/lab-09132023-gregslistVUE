<template>
    <form class="row" @submit.prevent="createHouse">
        <div class="mb-3 col-3">
            <label for="house-bedrooms">Bedrooms</label>
            <input v-model="houseData.bedrooms" type="number" id="house-bedrooms" class="form-control"
                placeholder="house bedrooms" max="10" required>
        </div>
        <div class="mb-3 col-3">
            <label for="house-bathrooms">Bathrooms</label>
            <input v-model="houseData.bathrooms" type="number" id="house-bathrooms" class="form-control"
                placeholder="house bathrooms" max="10" required>
        </div>
        <div class="mb-3 col-3">
            <label for="house-levels">Levels</label>
            <input v-model="houseData.levels" type="number" id="house-levels" class="form-control"
                placeholder="house levels" max="10" required>
        </div>
        <div class="mb-3 col-3">
            <label for="house-year">Year</label>
            <input v-model="houseData.year" type="number" id="house-year" class="form-control" placeholder="house year"
                max="2024" required>
        </div>
        <div class="mb-3 col-3">
            <label for="house-price">Price</label>
            <input v-model="houseData.price" type="number" id="house-price" class="form-control" placeholder="house price"
                min="1" required>
        </div>
        <div class="mb-3 col-12">
            <label for="house-imgUrl">Image Url</label>
            <input v-model="houseData.imgUrl" type="url" id="house-imgUrl" class="form-control" placeholder="must be url"
                min="1" required>
            <img class="img-fluid mt-1 h-100" :src="houseData.imgUrl" alt="">
        </div>
        <div class="mb-3 col-12">
            <label for="house-description">Description</label>
            <textarea v-model="houseData.description" id="house-description" class="form-control"
                placeholder="description"></textarea>
        </div>
        <div class="mb-3 col-12">
            <button class="btn btn-primary" title="submit house data to database">Submit</button>
        </div>
    </form>
</template>


<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { housesService } from '../services/HousesService.js';
import { useRouter } from 'vue-router';

export default {
    setup() {

        const houseData = ref({})
        const router = useRouter()
        return {
            houseData,
            async createHouse() {
                try {
                    logger.log('creating house 🏠', houseData.value)
                    const newHouse = await housesService.createHouse(houseData.value)
                    houseData.value = {}
                    Pop.toast('House Created', 'success')
                    // NOTE the next line actually pushes you to the page for the details of that one house
                    router.push({ name: 'House Details', params: { houseId: newHouse.id } })
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>
