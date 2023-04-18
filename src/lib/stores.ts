import { writable } from 'svelte/store';

// Create and export the stores
export let globalServerAddress = writable('http://localhost:8080');
export let globalJwt = writable('');
