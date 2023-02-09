// ! // Importing Modules //
import express, { Router, Request, Response } from 'express';

// * // Initialize Router //
const router: Router = express.Router();

// * // Root Route //
router.get('/', (req: Request, res: Response) => {
	return res.status(200).json({
		success: true,
		message: 'Welcome to Redis Based BullMQ Message Queuing System 🐼'
	});
});

// * // Health Check Route //
router.get('/ping', (req: Request, res: Response) => {
	const returnVal = { message: 'pong' };
	return res.status(200).send(returnVal);
});

// @ // Export SMS Router //
export default router;
