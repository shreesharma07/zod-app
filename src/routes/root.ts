// ! // Importing Modules //
import express, { Router, Request, Response } from 'express';
import { generateToken } from '../common/common';
import Logger from '../lib/logger';
import verify from '../middlewares/auth';

// * // Initialize Router //
const router: Router = express.Router();

// * // Root Route //
router.get('/', (req: Request, res: Response) => {
	return res.status(200).json({
		success: true,
		message: 'Welcome to Zod App 💎'
	});
});

// * // Health Check Route //
router
	.route('/ping')
	.get(verify, (req: Request, res: Response) => {
		try {
			const returnVal = { message: 'pong' };
			return res.status(200).send(returnVal);
		} catch (error: any) {
			const error_str: any = error?.message || error;
			Logger.error(error_str);
			return res.status(401).send({ auth: false, message: error_str });
		}
	})
	.post(verify, (req: Request, res: Response) => {
		try {
			const returnVal = { message: 'pong' };
			return res.status(200).send(returnVal);
		} catch (error: any) {
			const error_str: any = error?.message || error;
			Logger.error(error_str);
			return res.status(401).send({ auth: false, message: error_str });
		}
	});

const createTokenFunction = async (token_params: any) => {
	return await generateToken(token_params);
};

// * // Create Auth Token //
router
	.route('/createToken')
	.get(async (req: Request, res: Response) => {
		try {
			const token = await createTokenFunction(req.params);
			return res.status(200).send({ status: true, token: token });
		} catch (error: any) {
			const error_str: any = error?.message || error;
			Logger.error(error_str);
			return res.status(401).send({ auth: false, message: error_str });
		}
	})
	.post(async (req: Request, res: Response) => {
		try {
			const token = await createTokenFunction(req.body);
			return res.status(200).send({ status: true, token: token });
		} catch (error: any) {
			const error_str: any = error?.message || error;
			Logger.error(error_str);
			return res.status(401).send({ auth: false, message: error_str });
		}
	});

// @ // Export SMS Router //
export default router;
