<script lang="ts">
    import { UserCreateDto } from '../api/user-create-dto';

    export let userCreate: UserCreateDto = new UserCreateDto();
</script>

<p>
    <label for="username">Username:</label>
    <br />
    <input id="username" type="text" placeholder="Username" bind:value={userCreate.username} />
</p>
<p>
    <label for="password">Password:</label>
    <br />
    <input id="password" type="password" placeholder="Password" bind:value={userCreate.password} />
</p>
<p>Optional:</p>
<p>
    <label for="first-name">First name:</label>
    <br />
    <input id="first-name" type="text" placeholder="First name" bind:value={userCreate.firstName} />
</p>
<p>
    <label for="last-name">Last name:</label>
    <br />
    <input id="last-name" type="password" placeholder="Last name" bind:value={userCreate.lastName} />
</p>
