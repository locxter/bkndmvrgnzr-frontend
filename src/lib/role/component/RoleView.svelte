<script lang="ts">
    import { ERole } from '../db/erole';
    import type { Role } from '../db/role';

    export let role: Role;
</script>

{ERole[role.type]}
