import { requestError } from "@/errors"
import hotelsRepository from "@/repositories/hotels-repository"

async function findPaydTicket(userId: number) {

}

async function getAllHotels() {

    const hotels = await hotelsRepository.allHotels();
    if (!hotels) throw requestError(400, 'Bad request');

    return hotels;
}

async function getHotelById(hotelId: number) {

    const hotel = await hotelsRepository.hotelById(hotelId)
    if (!hotel) throw requestError(400, 'Bad request')

    return hotel;
}

const hotelsService = {
    getAllHotels
}

export default hotelsService;