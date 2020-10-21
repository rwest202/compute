import typescript from '@rollup/plugin-typescript';

export default {
    input: ['src/workers/spiral.ts', 'src/workers/gol.ts'],
    output: {
        sourcemap: true,
        dir: 'public/workers',
    },
    plugins: [
        typescript(),
    ],
    watch: {
        clearScreen: false,
    },
};