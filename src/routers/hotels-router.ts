import { getAllHotels, getHotelsRooms } from '@/controllers/hotels-controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const hotelsRouter = Router();

hotelsRouter
    .all('/*', authenticateToken)
    .get('/', getAllHotels)
    .get('/:hotelId', getHotelsRooms)

export default hotelsRouter;