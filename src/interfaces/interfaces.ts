// @ // Jwt Params //
export interface jwtParams {
	token: string;
	algo?: string;
	issuer?: string;
}

interface objectTypes extends Object {
	[key: string]: any;
}

// @ // Create Token Params //
export interface tokenParams {
	body?: objectTypes;
	params?: objectTypes;
}
