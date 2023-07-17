import { notFoundError, requestError } from "@/errors"
import hotelsRepository from "@/repositories/hotels-repository"
import ticketsRepository from "@/repositories/tickets-repository";


async function getAllHotels(userId: number) {
    const userTicket = await ticketsRepository.findUserTicketByUserId(userId);
    if (!userTicket || !userTicket.Enrollment) throw notFoundError();
    if (userTicket.status !== 'PAID' || userTicket.TicketType.isRemote || !userTicket.TicketType.includesHotel) {
        throw {
            name: 'PaymentRequiredError',
            message: 'Payment requried ',
        };
    }

    const hotels = await hotelsRepository.allHotels();
    if (!hotels) throw notFoundError();
    return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
    const userTicket = await ticketsRepository.findUserTicketByUserId(userId);
    if (!userTicket || !userTicket.Enrollment) throw notFoundError();
    if (userTicket.status !== 'PAID' || userTicket.TicketType.isRemote || !userTicket.TicketType.includesHotel) {
        throw {
            name: 'PaymentRequiredError',
            message: 'Payment requried ',
        };
    }

    const hotel = await hotelsRepository.hotelById(hotelId)
    if (!hotel) throw notFoundError();

    return hotel;
}

const hotelsService = {
    getAllHotels,
    getHotelById
}

export default hotelsService;