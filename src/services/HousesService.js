import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class HousesService {
    async getHouses() {
        const response = await api.get('api/houses')
        logger.log('🏘️service', response.data)
        AppState.houses = response.data.map(house => new House(house))
    }

    async activeHouseById(houseId) {
        AppState.activeHouse = null
        const response = await api.get(`api/houses/${houseId}`)
        // logger.log('🏠active house' response.data)
        AppState.activeHouse = new House(response.data)

    }

    async createHouse(houseData) {
        const response = await api.post('api/houses', houseData)
        logger.log('NEW HOUSE! 🛖', response.data)
        const newHouse = new House(response.data)
        AppState.houses.push(newHouse)
        return newHouse
    }

}

export const housesService = new HousesService()