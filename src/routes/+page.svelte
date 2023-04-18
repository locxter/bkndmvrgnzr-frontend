<script lang="ts">
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import { goto } from '$app/navigation';
    import { AuthController } from '$lib/auth/api/auth-controller';
    import { AuthLoginDto } from '$lib/auth/api/auth-login-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { UserCreateDto } from '$lib/user/api/user-create-dto';
    import { UserController } from '$lib/user/api/user-controller';

    let username: string;
    let password: string;
    let serverAddress: string;
    let authController: AuthController;
    let userController: UserController;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        authController = new AuthController(serverAddress);
        userController = new UserController(serverAddress);
    });

    function login() {
        let authLoginDto = new AuthLoginDto(username, password);
        authController
            .login(authLoginDto)
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

    function signup() {
        let userCreateDto = new UserCreateDto(username, password);
        userController
            .createUser(userCreateDto)
            .then((data) => {
                console.log(data);
                login();
            })
            .catch((error) => {
                console.error(error);
            });
    }
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<Header />
<main>
    <h2>Login / Signup</h2>
    <p>
        <label for="username">Username:</label>
        <br />
        <input id="username" type="text" placeholder="Username" bind:value={username} />
    </p>
    <p>
        <label for="password">Password:</label>
        <br />
        <input id="password" type="password" placeholder="Password" bind:value={password} />
    </p>
    <p>
        <label for="server-address">Server address:</label>
        <br />
        <input id="server-address" type="text" placeholder="Server address" bind:value={serverAddress} />
    </p>
    <p>
        <button on:click={login}>Login</button>
    </p>
    <p>New to bkndmvrgnzr? Create an account first:</p>
    <p>
        <button on:click={signup}>Signup</button>
    </p>
</main>
<Footer />
