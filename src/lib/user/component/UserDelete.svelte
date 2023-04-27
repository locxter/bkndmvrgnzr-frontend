<script lang="ts">
    import { UserDeleteDto } from '../api/user-delete-dto';

    export let userDelete: UserDeleteDto = new UserDeleteDto();
</script>

<p>
    <label for="username">Username*:</label>
    <br />
    <input id="username" type="text" maxlength="32" placeholder="Username" bind:value={userDelete.username} />
</p>
<p>
    <label for="password">Password*:</label>
    <br />
    <input id="password" type="password" maxlength="64" placeholder="Password" bind:value={userDelete.password} />
</p>
<p>
    <label for="confirm-password">Confirm password*:</label>
    <br />
    <input
        id="confirm-password"
        type="password"
        maxlength="64"
        placeholder="Confirm password"
        bind:value={userDelete.confirmPassword}
    />
</p>
<p>* Required</p>
