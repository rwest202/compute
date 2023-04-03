import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: [
        'src/workers/spiral.ts',
        'src/workers/gol.ts',
        'src/workers/feigenbaum.ts',
    ],
    output: {
        sourcemap: !production,
        dir: 'public/workers',
    },
    plugins: [typescript(), json()],
    watch: {
        include: 'src/workers/**',
        exclude: 'src/!worker/**',
    },
};
