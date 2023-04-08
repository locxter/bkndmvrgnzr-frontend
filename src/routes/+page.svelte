<script lang="ts">
    import Header from '../components/Header.svelte';
    import Footer from '../components/Footer.svelte';
    import { goto } from '$app/navigation';
    import { AuthController } from '$lib/auth/api/auth-controller';
    import { AuthLoginDto } from '$lib/auth/api/auth-login-dto';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { UserController } from '$lib/user/api/user-controller';
    import { UserCreateDto } from '$lib/user/api/user-create-dto';

    let username = 'user';
    let password = 'password';
    let serverAddress = 'http://localhost:8080';
    let authController = new AuthController(serverAddress);
    let userController = new UserController(serverAddress);

    function login() {
        let authLoginDto = new AuthLoginDto(username, password);
        authController
            .login(authLoginDto)
            .then((jwt) => {
                globalJwt.set(jwt);
                globalServerAddress.set(serverAddress);

                userController
                    .getUser()
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                //goto("/welcome");
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
    }

    function logout() {
        authController
            .logout()
            .then(() => {
                userController
                    .getUser()
                    .then((data) => {
                        console.log(data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function signup() {
        let userCreateDto = new UserCreateDto(username, password);
        userController
            .createUser(userCreateDto)
            .then((userResponseDto) => {
                console.log(userResponseDto);
                login();
            })
            .catch((error) => {
                console.error(error);
            });
    }
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
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
        <button on:click={logout}>Logout</button>
    </p>
    <p>New to bkndmvrgnzr? Create an account first:</p>
    <p>
        <button on:click={signup}>Signup</button>
    </p>
</main>
<Footer />
