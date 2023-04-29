<script lang="ts">
    import { goto } from '$app/navigation';
    import { BookContributorController } from '$lib/bookcontributor/api/book-contributor-controller';
    import { BookContributor } from '$lib/bookcontributor/db/book-contributor';
    import { BookContributorId } from '$lib/bookcontributor/db/book-contributor-id';
    import { BookRoleController } from '$lib/bookrole/api/book-role-controller';
    import type { BookRole } from '$lib/bookrole/db/book-role';
    import { ContributorController } from '$lib/contributor/api/contributor-controller';
    import ContributorCreate from '$lib/contributor/component/ContributorCreate.svelte';
    import { Contributor } from '$lib/contributor/db/contributor';
    import { MovieContributorController } from '$lib/moviecontributor/api/movie-contributor-controller';
    import { MovieContributor } from '$lib/moviecontributor/db/movie-contributor';
    import { MovieContributorId } from '$lib/moviecontributor/db/movie-contributor-id';
    import { MovieRoleController } from '$lib/movierole/api/movie-role-controller';
    import type { MovieRole } from '$lib/movierole/db/movie-role';
    import { globalJwt, globalServerAddress } from '$lib/stores';
    import Footer from '../../../components/Footer.svelte';
    import Header from '../../../components/Header.svelte';
    import Navigation from '../../../components/Navigation.svelte';

    $: contributorController = new ContributorController($globalServerAddress, $globalJwt);
    $: bookRoleController = new BookRoleController($globalServerAddress, $globalJwt);
    $: movieRoleController = new MovieRoleController($globalServerAddress, $globalJwt);
    $: bookContributorController = new BookContributorController($globalServerAddress, $globalJwt);
    $: movieContributorController = new MovieContributorController($globalServerAddress, $globalJwt);
    let contributor: Contributor = new Contributor();
    let contributorBookRoles: BookRole[] = [];
    let contributorMovieRoles: MovieRole[] = [];

    async function createContributor() {
        try {
            let data = await contributorController.createContributor(contributor);
            for (let contributorBookRole of contributorBookRoles) {
                let bookContributorCreate = new BookContributor(new BookContributorId(), data, contributorBookRole);
                await bookContributorController.createBookContributor(bookContributorCreate);
            }
            for (let contributorMovieRole of contributorMovieRoles) {
                let movieContributorCreate = new MovieContributor(new MovieContributorId(), data, contributorMovieRole);
                await movieContributorController.createMovieContributor(movieContributorCreate);
            }
            alert('Contributor successfully created');
            goto('/contributor/' + data.id.value);
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
        bind:contributor
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
