import typescript from '@rollup/plugin-typescript';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: ['src/workers/spiral.ts', 'src/workers/gol.ts'],
    output: {
        sourcemap: !production,
        dir: 'public/workers',
    },
    plugins: [
        typescript(),
    ],
    watch: {
        include: 'src/workers/**',
        exclude: 'src/!worker/**'
    },
};