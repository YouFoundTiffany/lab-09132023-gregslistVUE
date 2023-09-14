<template>
    <div class="container">


        <section class="row">
            <div v-for="house in houses" :key="house.id" class="col-12 col-md-6">
                <HouseCard />

            </div>

        </section>
    </div>
</template>

<script>
import { computed, onMounted, popScopeId } from 'vue';
import Pop from '../utils/Pop.js';
import { housesService } from '../services/HousesService.js';
import { AppState } from '../AppState.js';

export default {
    setup() {
        onMounted(() => {
            getHouses();
        });
        async function getHouses() {
            try {
                await housesService.getHouses()
            } catch (error) {
                Pop.error(error)
            }
        }


        return {
            houses: computed(() => AppState.houses)
        };
    },
};
</script>


<style lang="scss" scoped></style>