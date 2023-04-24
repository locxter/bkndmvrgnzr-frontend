<script lang="ts">
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';
    import Footer from '../../../components/Footer.svelte';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { ContributorCreateDto } from '$lib/contributor/api/contributor-create-dto';
    import ContributorCreate from '$lib/contributor/component/ContributorCreate.svelte';
    import { goto } from '$app/navigation';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import { BookContributorCreateDto } from '$lib/bookcontributor/api/book-contributor-create-dto';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import { MovieContributorCreateDto } from '$lib/moviecontributor/api/movie-contributor-create-dto';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import type { MovieRoleResponseDto } from '$lib/movierole/api/movie-role-response-dto';

    let serverAddress: string;
    let jwt: string;
    let contributorController: ContributorController;
    let bookRoleController: BookRoleController;
    let movieRoleController: MovieRoleController;
    let bookContributorController: BookContributorController;
    let movieContributorController: MovieContributorController;
    let contributorCreate: ContributorCreateDto;
    let contributorBookRoles: BookRoleResponseDto[] = [];
    let contributorMovieRoles: MovieRoleResponseDto[] = [];

    // Subscribe to global stores
    globalServerAddress.subscribe((data) => {
        serverAddress = data;
        contributorController = new ContributorController(serverAddress, jwt);
        bookRoleController = new BookRoleController(serverAddress, jwt);
        movieRoleController = new MovieRoleController(serverAddress, jwt);
        bookContributorController = new BookContributorController(serverAddress, jwt);
        movieContributorController = new MovieContributorController(serverAddress, jwt);
    });
    globalJwt.subscribe((data) => {
        jwt = data;
        contributorController = new ContributorController(serverAddress, jwt);
        bookRoleController = new BookRoleController(serverAddress, jwt);
        movieRoleController = new MovieRoleController(serverAddress, jwt);
        bookContributorController = new BookContributorController(serverAddress, jwt);
        movieContributorController = new MovieContributorController(serverAddress, jwt);
    });

    async function createContributor() {
        try {
            let data = await contributorController.createContributor(contributorCreate);
            for (let contributorBookRole of contributorBookRoles) {
                let bookContributorCreate = new BookContributorCreateDto(data.id, contributorBookRole.id);
                await bookContributorController.createBookContributor(bookContributorCreate);
            }
            for (let contributorMovieRole of contributorMovieRoles) {
                let movieContributorCreate = new MovieContributorCreateDto(data.id, contributorMovieRole.id);
                await movieContributorController.createMovieContributor(movieContributorCreate);
            }
            alert('Contributor successfully created');
            goto('/contributor/' + data.id);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Create contributor | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    <h2>Create contributor</h2>
    <ContributorCreate
        bind:contributorCreate
        bind:contributorBookRoles
        bind:contributorMovieRoles
        {bookRoleController}
        {movieRoleController}
    />
    <p>
        <button on:click={createContributor}>Create contributor</button>
    </p>
    <p>
        <a href="/contributor">
            <button>Return</button>
        </a>
    </p>
</main>
<Footer />
