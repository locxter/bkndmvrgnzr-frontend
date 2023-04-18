<script lang="ts">
    import { page } from '$app/stores';

    let isbn: string;

    page.subscribe((data) => {
        isbn = data.params.isbn;
    });
</script>

<p>TODO</p>
