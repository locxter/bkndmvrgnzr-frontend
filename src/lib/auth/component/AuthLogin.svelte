<script lang="ts">
    import { AuthLoginDto } from '../api/auth-login-dto';

    export let authLogin: AuthLoginDto = new AuthLoginDto();
</script>

<p>
    <label for="username">Username:</label>
    <br />
    <input id="username" type="text" placeholder="Username" bind:value={authLogin.username} />
</p>
<p>
    <label for="password">Password:</label>
    <br />
    <input id="password" type="password" placeholder="Password" bind:value={authLogin.password} />
</p>
