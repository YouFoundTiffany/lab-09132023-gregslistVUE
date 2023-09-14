<template>
    <div class="container">
        <section v-if="activeHouse" class="row justify-content-center">
            <div class="col-12">
                <img class="img-fluid" :src="activeHouse" alt="">
            </div>
            <div class="col-8">
                <p>{{ activeHouse.year }}{{ activeHouse.bedrooms }}{{ activeHouse.levels }}</p>
            </div>
            <div class="col-8">
                <p>{{ activeHouse.description }}</p>
            </div>
            <div class="col-6">
                <p>${{ activeHouse.price }}</p>
            </div>
            <div class="col-6 text-end">
                <span>{{ activeHouse.creator.name }}</span>
                <img class="profile-pic" :src="activeHouse.creator.picture" alt="">
            </div>
            <button v-if="activeHouse.creatorId == account.id" @click="deleteHouse" class="btn btn-danger">Delete
                Listing <i class="mdi mdi-delete-forever"></i></button>
        </section>
        <section v-else>
            <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { logger } from '../utils/Logger.js';
import { housesService } from '../services/HousesService.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
    setup() {
        // NOTE pages should handle the getting of data they require to show/use and nothing more
        const route = useRoute() //the route is where you are in context of the app your url
        const router = useRouter() // the router is how to move between pages
        onMounted(() => {
            activeHouseById()
            logger.log(route)
        })
        async function activeHouseById() {
            try {
                const carId = route.params.carId
                await housesService.activeHouseById(carId)
            } catch (error) {
                Pop.error(error)
            }

            return {
                // activeHouse: computed(()=> AppState.houses.find(h => h.id ==))
                // houses: computed(()=> AppState.cars)
                activeHouse: computed(() => AppState.activeHouse),
                account: computed(() => AppState.account),
                async deleteHouse() {
                    try {
                        if (await Pop.confirm('Are you sure about that?')) {
                            const carId = AppState.activeHouse.id
                            await housesService.removeHouse(carId)
                            router.push({ name: 'Houses' })
                            Pop.success('car Removed')
                        }
                    } catch (error) {
                        Pop.error(error)
                    }
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>
.profile-pic {
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
}
</style>