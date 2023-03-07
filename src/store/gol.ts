import { writable } from 'svelte/store';

export const maxIterations = writable(1000);
export const steps = writable(0);
export const fps = writable(0);
export const paused = writable(false);
export const fpsThrottle = writable(21);
export const dotColor = writable('#000000');
export const backgroundColor = writable('#ffffff');
export const gridSize = writable(50);
