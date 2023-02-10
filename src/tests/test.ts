import { describe, expect, it } from 'vitest';
import { z } from 'zod';

const pipe = z
	.string()
	.transform((val) => val.length)
	.pipe(z.number().min(10))
	.pipe(z.number().max(50));

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWZYZ0123456789abcdefghijklmnopqrstuvwxyz';
const reqLength = 12;
let randomString = '';

for (let i = 0; i < reqLength; i++) {
	randomString += characters[`${Math.floor(Math.random() * characters.length)}`];
}
randomString += '@gmail.com';

const result = pipe.parse(randomString.toString());

describe('Pipe', () => {
	it('REPL', () => {
		expect(result).match(/^[a-zA-Z0-9@\.]*/g);
		const res = result.toString().match(/@gmail.com/g);
		console.log({ string: [randomString, reqLength] });
	});
});
