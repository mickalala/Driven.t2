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

        const hotels = hotelsService.getAllHotels();
        res.status(httpStatus.OK).send(hotels)

    } catch (error) {
        if (error.name === 'payment_required') {
            res.status(402)
        }
    }
}

export async function getHotelsRooms(req: AuthenticatedRequest, res: Response) {
    const hotelId = req.params;
    try {

    } catch (error) {

    }
}