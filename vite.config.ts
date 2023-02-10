import { defineConfig } from 'vitest/config';
export default defineConfig({
	test: {
		include: ['src/tests/*'],
		exclude: ['Temp/*', 'node_modules/*']
	}
});
