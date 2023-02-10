// ! // Import Module //
import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../common/common';
import Logger from '../lib/logger';

// % // Middleware Function For Authenticating Request //
export default async function verify(req: Request, res: Response, next: NextFunction) {
	try {
		// * // Extract Token From Headers //
		const token = req.method === 'GET' ? req.params['x-access-token'] || req.params['X-ACCESS-TOKEN'] : req.headers['x-access-token'] || req.headers['X-ACCESS-TOKEN'];

		// ! // Check for Valid Token //
		if (!token) {
			return res.status(401).send({ auth: false, message: 'No token provided.' });
		} else {
			// * // Compare Auth Token //
			const textVerified = token === process.env.AUTH_TOKEN;
			const validatedToken: any = await verifyJWT(token);
			if (textVerified && validatedToken) {
				next();
			} else {
				return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
			}
		}
	} catch (error: any) {
		let error_str = error?.message || error;
		Logger.error(error_str);
		return res.status(401).send({ auth: false, message: error_str });
	}
}
