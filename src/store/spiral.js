import { writable } from 'svelte/store';

export const backgroundColor = writable('#ffffff');
export const dotSize = writable(3);
export const showGrid = writable(false);
export const gridColor = writable('#e0e0e0');
export const gridWidth = writable(1);
export const density = writable(9);
export const throttle = writable(0.01);
export const dotColor = writable('#000000');
export const dataUrl = writable(null);
