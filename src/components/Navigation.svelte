<script lang="ts">
    import { goto } from '$app/navigation';
    import { AuthController } from '$lib/auth/api/auth-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import { UserController } from '$lib/user/api/user-controller';

    // Subscribe to global stores
    let jwt: string;
    let serverAddress: string;
    let authController = new AuthController();
    let userController = new UserController();
    globalJwt.subscribe((data) => {
        jwt = data as string;
    });
    globalServerAddress.subscribe((data) => {
        serverAddress = data as string;
        authController.serverAddress = serverAddress;
        userController.serverAddress = serverAddress;
    });

    function logout() {
        authController
            .logout()
            .then((jwt) => {
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
        goto('/');
    }
</script>

<nav>
    <a href="/">Home</a>
    <a href="/welcome">Welcome</a>
    <a href="/search">Search</a>
    <a href="/library">Library</a>
    <a href="/settings">Settings</a>
    <button on:click={logout}>Logout</button>
</nav>
