<script lang="ts">
    import type { GenreBrief } from '../db/genre-brief';

    export let genre: GenreBrief;
</script>

<a href="/genre/{genre.id.value}">{genre.name}</a>
