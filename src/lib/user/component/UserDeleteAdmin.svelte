<script lang="ts">
    import { UserDeleteAdminDto } from '../api/user-delete-admin-dto';

    export let userDeleteAdmin: UserDeleteAdminDto = new UserDeleteAdminDto();
</script>

<p>
    <label for="username">Username:</label>
    <br />
    <input id="username" type="text" placeholder="Username" bind:value={userDeleteAdmin.username} />
</p>
