import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#090a0b', gold:'#c3ad80', jade:'#b9c0c3' } } }, plugins: [] } satisfies Config;
