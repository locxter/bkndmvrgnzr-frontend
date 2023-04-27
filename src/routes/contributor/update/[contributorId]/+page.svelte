<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import { BookContributor } from '$lib/bookcontributor/db/book-contributor';
    import { BookContributorId } from '$lib/bookcontributor/db/book-contributor-id';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import ContributorUpdate from '$lib/contributor/component/ContributorUpdate.svelte';
    import type { Contributor } from '$lib/contributor/db/contributor';
    import { ContributorId } from '$lib/contributor/db/contributor-id';
    import { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import { MovieContributor } from '$lib/moviecontributor/db/movie-contributor';
    import { MovieContributorId } from '$lib/moviecontributor/db/movie-contributor-id';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import { onMount } from 'svelte';
    import Footer from '../../../../components/Footer.svelte';
    import Header from '../../../../components/Header.svelte';
    import Navigation from '../../../../components/Navigation.svelte';

    let contributorId: string;
    let serverAddress: string;
    let jwt: string;
    let contributorController: ContributorController;
    let bookRoleController: BookRoleController;
    let movieRoleController: MovieRoleController;
    let bookContributorController: BookContributorController;
    let movieContributorController: MovieContributorController;
    let contributor: Contributor;
    let contributorBookRoles: BookRole[] = [];
    let contributorMovieRoles: MovieRole[] = [];
    let contributorUpdate: Contributor;
    let contributorUpdateBookRoles: BookRole[] = [];
    let contributorUpdateMovieRoles: MovieRole[] = [];

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
            contributor = await contributorController.getContributor(new ContributorId(contributorId));
            contributorUpdate = Object.create(contributor);
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
            // Delete unselected book roles
            for (let contributorBookRole of contributorBookRoles) {
                if (!contributorUpdateBookRoles.map((it) => it.id.value).includes(contributorBookRole.id.value)) {
                    await bookContributorController.deleteBookContributor(
                        contributor.bookContributors[
                            contributor.bookContributors
                                .map((it) => it.bookRole.id.value)
                                .indexOf(contributorBookRole.id.value)
                        ].id
                    );
                }
            }
            // Create new book roles
            for (let contributorUpdateBookRole of contributorUpdateBookRoles) {
                if (!contributorBookRoles.map((it) => it.id.value).includes(contributorUpdateBookRole.id.value)) {
                    let bookContributorCreate = new BookContributor(
                        new BookContributorId(),
                        contributor,
                        contributorUpdateBookRole
                    );
                    await bookContributorController.createBookContributor(bookContributorCreate);
                }
            }
            // Delete unselected movie roles
            for (let contributorMovieRole of contributorMovieRoles) {
                if (!contributorUpdateMovieRoles.map((it) => it.id.value).includes(contributorMovieRole.id.value)) {
                    await movieContributorController.deleteMovieContributor(
                        contributor.movieContributors[
                            contributor.movieContributors
                                .map((it) => it.movieRole.id.value)
                                .indexOf(contributorMovieRole.id.value)
                        ].id
                    );
                }
            }
            // Create new movie roles
            for (let contributorUpdateMovieRole of contributorUpdateMovieRoles) {
                if (!contributorMovieRoles.map((it) => it.id.value).includes(contributorUpdateMovieRole.id.value)) {
                    let movieContributorCreate = new MovieContributor(
                        new MovieContributorId(),
                        contributor,
                        contributorUpdateMovieRole
                    );
                    await movieContributorController.createMovieContributor(movieContributorCreate);
                }
            }
            alert('Contributor successfully updated');
            goto('/contributor/' + contributor.id.value);
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
            <a href="/contributor/{contributor.id.value}">
                <button>Return</button>
            </a>
        </p>
    {:else}
        <h2>Contributor not found</h2>
    {/if}
</main>
<Footer />
