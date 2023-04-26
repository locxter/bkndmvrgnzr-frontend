import { writable, type Writable } from 'svelte/store';
import type { ERole } from './role/db/erole';

// Create and export the stores
export let globalServerAddress = writable('http://localhost:8080');
export let globalJwt = writable('');
export let globalRoles: Writable<ERole[]> = writable([]);
