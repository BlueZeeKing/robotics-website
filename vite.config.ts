import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	assetsInclude: ['**/*.glb', '**/*.fbx'],
	plugins: [sveltekit()]
};

export default config;
