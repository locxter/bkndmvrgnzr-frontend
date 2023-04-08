import { writable } from 'svelte/store';

// Create and export the stores
export let globalJwt = writable();
export let globalServerAddress = writable();