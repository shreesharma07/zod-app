/* eslint-disable no-async-promise-executor */
// ! // Import Modules //
import * as _ from 'lodash';
import Logger from '../lib/logger';
import axios from 'axios';
import jsonwebtoken from 'jsonwebtoken';
import { jwtParams, tokenParams } from '../interfaces/interfaces';
import moment from 'moment-timezone';

// @ // Interface Filtered Json //
interface jsonParams {
	payload: Array<object> | any;
	data_type?: string;
}

// @ // Interface Http Request Data //
interface HttpFetchParams {
	url: string;
	method?: string;
	options?: object;
}

// % // Function to Filter Json Data // ( Replace Null & Undefined as Empty String ) //
export const getFilteredJson = async (params: jsonParams): Promise<any> => {
	try {
		// ! // Check for Data Type //
		if (params?.data_type === 'array' && Array.isArray(params.payload)) {
			return params.payload.map((element: object) => {
				return _.mapValues(element, (value: unknown) => (typeof value === 'boolean' || typeof value === 'number' ? value : value || ''));
			});
		} else {
			return _.mapValues(params.payload, (value: unknown) => (typeof value === 'boolean' || typeof value === 'number' ? value : value || ''));
		}
	} catch (error) {
		Logger.error(error);
		return params?.data_type === 'array' ? [] : {};
	}
};

// % // Function to Request Http Data //
export const requestHttpData = async (params: HttpFetchParams) => {
	try {
		// * // Extract Parameters //
		const url = params.url || '';
		const options = params.options || {};
		const method = params.method?.toUpperCase() || 'GET';

		// ! // Check for Valid Url //
		if (!(url === '')) {
			return await axios({ method: method, url: url, data: options });
		} else {
			throw new Error('Invalid Url');
		}
	} catch (error) {
		Logger.error(error);
		return {};
	}
};

// % // Function to Verify JWT //
export const verifyJWT = async (token: any): Promise<any> => {
	// ! // Return Promise as Response //
	return new Promise(async (resolve, reject) => {
		try {
			// * // Get Token Secret //
			const secret = process.env.JWT_SECRET || '';
			// ! // Return Validated Token Response //
			jsonwebtoken.verify(token || '', secret, { algorithms: ['HS256', 'HS512'] }, (err: any, decoded: any) => {
				if (err) {
					reject('Failed to authenticate token.');
				}
				resolve(true);
			});
		} catch (error: any) {
			Logger.error(error);
			reject(error);
		}
	});
};

// % // Function to Create Token JWT //
export const generateToken = (req: tokenParams) => {
	return new Promise((resolve, reject) => {
		try {
			// * // Token Payload //
			let tokenPayload: object = {
				sub: req.body?.sub || req.params?.sub || 'ZOD-EXPRESS-APP',
				name: req.body?.name || req.params?.name || 'ADMIN@ZOD',
				admin: req.body?.admin || req.params?.admin || true,
				iat: moment().tz('Asia/Kolkata').valueOf()
			};
			const JWTSECRET = process.env.JWT_SECRET || '';
			jsonwebtoken.sign(tokenPayload, JWTSECRET, { algorithm: 'HS512', issuer: 'SHREE-KUMAR-SHARMA' }, (err: any, token: any) => {
				if (err) throw new Error(JSON.stringify(err));
				resolve(token);
			});
		} catch (error: any) {
			Logger.error(error);
			reject(error);
		}
	});
};

// % // Function to Create Smaller Chunks of Array //
export const createSmallerChunks = async (arrs: Array<any>, size: number): Promise<any[]> => {
	// ! // Return Promise as Response //
	return new Promise(async (resolve, reject) => {
		try {
			const smallrChunks = _.chunk(arrs, size);
			resolve(smallrChunks);
		} catch (error: any) {
			Logger.error(error?.message);
			resolve([]);
		}
	});
};
