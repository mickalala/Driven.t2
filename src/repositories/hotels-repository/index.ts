import { prisma } from "@/config";

async function allHotels() {
    return prisma.hotel.findMany();
}

async function hotelById(hotelId: number) {
    return prisma.hotel.findFirst({
        where: {
            id: hotelId
        },
        include: {
            Rooms: true
        }
    })
}

export default {
    allHotels,
    hotelById
}