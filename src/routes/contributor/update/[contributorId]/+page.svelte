<script lang="ts">
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';
    import Footer from '../../../../components/Footer.svelte';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import { globalServerAddress, globalJwt } from '$lib/stores';
    import type { ContributorUpdateDto } from '$lib/contributor/api/contributor-update-dto';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import ContributorUpdate from '$lib/contributor/component/ContributorUpdate.svelte';
    import { goto } from '$app/navigation';
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import type { BookRoleResponseDto } from '$lib/bookrole/api/book-role-response-dto';
    import type { MovieRoleResponseDto } from '$lib/movierole/api/movie-role-response-dto';
    import { BookContributorCreateDto } from '$lib/bookcontributor/api/book-contributor-create-dto';
    import { MovieContributorCreateDto } from '$lib/moviecontributor/api/movie-contributor-create-dto';

    let contributorId: string;
    let serverAddress: string;
    let jwt: string;
    let contributorController: ContributorController;
    let bookRoleController: BookRoleController;
    let movieRoleController: MovieRoleController;
    let bookContributorController: BookContributorController;
    let movieContributorController: MovieContributorController;
    let contributor: ContributorResponseDto;
    let contributorBookRoles: BookRoleResponseDto[];
    let contributorMovieRoles: MovieRoleResponseDto[];
    let contributorUpdate: ContributorUpdateDto;
    let contributorUpdateBookRoles: BookRoleResponseDto[];
    let contributorUpdateMovieRoles: MovieRoleResponseDto[];

    page.subscribe((data) => {
        contributorId = data.params.contributorId;
    });

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

    onMount(async () => {
        try {
            contributor = await contributorController.getContributor(contributorId);
            contributorUpdate = contributor as ContributorUpdateDto;
            contributorUpdateBookRoles = await bookRoleController.getAllBookRolesOfContributor(contributor.id);
            contributorBookRoles = [...contributorUpdateBookRoles];
            contributorUpdateMovieRoles = await movieRoleController.getAllMovieRolesOfContributor(contributor.id);
            contributorMovieRoles = [...contributorUpdateMovieRoles];
        } catch (error) {
            console.error(error);
            alert(error);
        }
    });

    async function updateContributor() {
        try {
            contributor = await contributorController.updateContributor(contributor.id, contributorUpdate);
            for (let contributorBookRole of contributorBookRoles) {
                if (!contributorUpdateBookRoles.map((it) => it.id).includes(contributorBookRole.id)) {
                    await bookContributorController.deleteBookContributor(
                        contributor.bookContributors[
                            contributor.bookContributors.map((it) => it.bookRole.id).indexOf(contributorBookRole.id)
                        ].id
                    );
                }
            }
            for (let contributorUpdateBookRole of contributorUpdateBookRoles) {
                if (!contributorBookRoles.map((it) => it.id).includes(contributorUpdateBookRole.id)) {
                    let bookContributorCreate = new BookContributorCreateDto(
                        contributor.id,
                        contributorUpdateBookRole.id
                    );
                    await bookContributorController.createBookContributor(bookContributorCreate);
                }
            }
            for (let contributorMovieRole of contributorMovieRoles) {
                if (!contributorUpdateMovieRoles.map((it) => it.id).includes(contributorMovieRole.id)) {
                    await movieContributorController.deleteMovieContributor(
                        contributor.movieContributors[
                            contributor.movieContributors.map((it) => it.movieRole.id).indexOf(contributorMovieRole.id)
                        ].id
                    );
                }
            }
            for (let contributorUpdateMovieRole of contributorUpdateMovieRoles) {
                if (!contributorMovieRoles.map((it) => it.id).includes(contributorUpdateMovieRole.id)) {
                    let movieContributorCreate = new MovieContributorCreateDto(
                        contributor.id,
                        contributorUpdateMovieRole.id
                    );
                    await movieContributorController.createMovieContributor(movieContributorCreate);
                }
            }
            alert('Contributor successfully updated');
            goto('/contributor/' + contributor.id);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    async function deleteContributor() {
        try {
            await contributorController.deleteContributor(contributor.id);
            alert('Contributor successfully deleted');
            goto('/contributor');
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
</script>

<svelte:head>
    <title>Update contributor | bkndmvrgnzr</title>
</svelte:head>

<Header>
    <Navigation />
</Header>
<main>
    {#if contributor}
        <h2>Update contributor</h2>
        <ContributorUpdate
            bind:contributorUpdate
            bind:contributorUpdateBookRoles
            bind:contributorUpdateMovieRoles
            {bookRoleController}
            {movieRoleController}
        />
        <p>
            <button on:click={updateContributor}>Update contributor</button>
        </p>
        <p>
            <button on:click={deleteContributor}>Delete contributor</button>
        </p>
        <p>
            <a href="/contributor/{contributor.id}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Contributor not found</h2>
    {/if}
</main>
<Footer />
