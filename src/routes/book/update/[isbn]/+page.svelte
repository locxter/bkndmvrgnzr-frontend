<script lang="ts">
    import { page } from '$app/stores';

    let isbn: string;

    page.subscribe((data) => {
        isbn = data.params.isbn;
    });
</script>

<svelte:head>
    <title>Edit book | bkndmvrgnzr</title>
</svelte:head>

<p>TODO</p>
