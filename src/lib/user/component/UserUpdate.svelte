<script lang="ts">
    import { UserUpdateDto } from '../api/user-update-dto';

    export let userUpdate: UserUpdateDto = new UserUpdateDto();
</script>

<p>
    <label for="username">Username:</label>
    <br />
    <input id="username" type="text" placeholder="Username" bind:value={userUpdate.username} />
</p>
<p>
    <label for="password">Password:</label>
    <br />
    <input id="password" type="password" placeholder="Password" bind:value={userUpdate.password} />
</p>
<p>
    <label for="first-name">First name:</label>
    <br />
    <input id="first-name" type="text" placeholder="First name" bind:value={userUpdate.firstName} />
</p>
<p>
    <label for="last-name">Last name:</label>
    <br />
    <input id="last-name" type="password" placeholder="Last name" bind:value={userUpdate.lastName} />
</p>
