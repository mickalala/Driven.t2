import { AuthenticatedRequest } from "@/middlewares";
import { Request, Response } from "express";
import ticketService from '@/services/tickets-service'
import { notFoundError } from "@/errors";
import hotelsService from "@/services/hotes-service";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    const { userId } = req
    try {
        const existUserTicket = ticketService.getTicketByUserId(userId);
        if (!existUserTicket) throw notFoundError();

        if ((await existUserTicket).status === 'RESERVED') {
            throw { name: 'payment_required', message: 'Cannot find payment.' }
        }

        const hotels = hotelsService.getAllHotels(userId);
        res.status(httpStatus.OK).send(hotels)

    } catch (error) {
        if (error.name === 'payment_required') {
            res.status(402)
        }
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }
}

export async function getHotelsRooms(req: AuthenticatedRequest, res: Response) {
    const { hotelId } = req.params as Record<string, string>;
    const { userId } = req;
    try {
        const numHotelId = parseInt(hotelId);
        if (!numHotelId || isNaN(numHotelId) || numHotelId <= 0) {
            throw { name: 'BadRequestError', message: 'Invalid Id' };
        }
        const hotelRooms = hotelsService.getHotelById(userId, numHotelId);
        res.status(httpStatus.OK).send(hotelRooms)

    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.status(httpStatus.NOT_FOUND).send({
                message: error.message,
            });
        }
        if (error.name === 'PaymentRequiredError') {
            return res.status(httpStatus.PAYMENT_REQUIRED).send({
                message: error.message,
            });
        }
        return res.sendStatus(httpStatus.BAD_REQUEST)

    }
}