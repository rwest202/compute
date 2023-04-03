import { writable } from 'svelte/store';

export const rStep = writable(0.001);
export const y0 = writable(0.5);
export const minIterations = writable(1000);
export const maxIterations = writable(1200);
export const throttle = writable(0.001);
