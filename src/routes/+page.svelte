<script lang="ts">
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import { goto } from '$app/navigation';
    import { AuthController } from '$lib/auth/api/auth-controller';
    import { AuthLoginDto } from '$lib/auth/api/auth-login-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import type { UserCreateDto } from '$lib/user/api/user-create-dto';
    import { UserController } from '$lib/user/api/user-controller';
    import AuthLogin from '$lib/auth/component/AuthLogin.svelte';
    import UserCreate from '$lib/user/component/UserCreate.svelte';

    let serverAddress: string;
    let authController: AuthController;
    let userController: UserController;
    let authLogin: AuthLoginDto = new AuthLoginDto('admin', 'password');
    let userCreate: UserCreateDto;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        authController = new AuthController(serverAddress);
        userController = new UserController(serverAddress);
    });

    function login() {
        if (authLogin.username && authLogin.username.trim() && authLogin.password && authLogin.password.trim()) {
            authLogin.username = authLogin.username.trim();
            authLogin.password = authLogin.password.trim();
            authController
                .login(authLogin)
                .then((data) => {
                    globalJwt.set(data);
                    globalServerAddress.set(serverAddress);
                    goto('/welcome');
                })
                .catch((error) => {
                    console.error(error);
                    alert(error);
                });
        }
    }

    function signup() {
        if (userCreate.username && userCreate.username.trim() && userCreate.password && userCreate.password.trim()) {
            userCreate.username = userCreate.username.trim();
            userCreate.password = userCreate.password.trim();
            userController
                .createUser(userCreate)
                .then((data) => {
                    console.log(data);
                    authLogin = userCreate as AuthLoginDto;
                    login();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }
</script>

<svelte:head>
    <title>Login / Signup | bkndmvrgnzr</title>
</svelte:head>

<Header />
<main>
    <h2>Login / Signup</h2>
    <AuthLogin bind:authLogin />
    <p>
        <button on:click={login}>Login</button>
    </p>
    <details>
        <summary>New to bkndmvrgnzr? Create an account first</summary>
        <UserCreate bind:userCreate />
        <p>
            <button on:click={signup}>Signup</button>
        </p>
    </details>
    <details>
        <summary>Advanced options</summary>
        <p>
            <label for="server-address">Server address:</label>
            <br />
            <input id="server-address" type="text" placeholder="Server address" bind:value={serverAddress} />
        </p>
    </details>
</main>
<Footer />
