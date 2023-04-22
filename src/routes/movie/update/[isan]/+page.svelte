<script lang="ts">
    import { page } from '$app/stores';

    let isan: string;

    page.subscribe((data) => {
        isan = data.params.isan;
    });
</script>

<svelte:head>
    <title>Edit movie | bkndmvrgnzr</title>
</svelte:head>

<p>TODO</p>
