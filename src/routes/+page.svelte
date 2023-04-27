<script lang="ts">
    import { goto } from '$app/navigation';
    import { AuthController } from '$lib/auth/api/auth-controller';
    import { AuthLoginDto } from '$lib/auth/api/auth-login-dto';
    import AuthLogin from '$lib/auth/component/AuthLogin.svelte';
    import { RoleController } from '$lib/role/api/role-controller';
    import { globalJwt, globalRoles, globalServerAddress } from '$lib/stores';
    import { UserController } from '$lib/user/api/user-controller';
    import type { UserCreateDto } from '$lib/user/api/user-create-dto';
    import UserCreate from '$lib/user/component/UserCreate.svelte';
    import Footer from '../components/Footer.svelte';
    import Header from '../components/Header.svelte';

    let serverAddress: string;
    let authController: AuthController;
    let userController: UserController;
    let roleController: RoleController;
    let authLogin: AuthLoginDto = new AuthLoginDto('admin', 'password');
    let userCreate: UserCreateDto;

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        authController = new AuthController(serverAddress);
        userController = new UserController(serverAddress);
    });

    async function login() {
        try {
            authLogin.username = authLogin.username.trim();
            authLogin.password = authLogin.password.trim();
            let data = await authController.login(authLogin);
            globalJwt.set(data);
            globalServerAddress.set(serverAddress);
            roleController = new RoleController(serverAddress, data);
            let roles = await roleController.getAllRolesOfUser();
            globalRoles.set(roles.map((it) => it.type));
            goto('/welcome');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function signup() {
        try {
            userCreate.username = userCreate.username.trim();
            userCreate.password = userCreate.password.trim();
            await userController.createUser(userCreate);
            authLogin = userCreate as AuthLoginDto;
            login();
        } catch (error) {
            console.error(error);
            alert(error);
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
