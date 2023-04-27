<script lang="ts">
    import { ERole } from '../db/erole';
    import { Role } from '../db/role';

    export let role: Role = new Role();
</script>

{ERole[role.type]}
