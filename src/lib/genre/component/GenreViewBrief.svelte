<script lang="ts">
    import { GenreBrief } from '../db/genre-brief';

    export let genre: GenreBrief = new GenreBrief();
</script>

<a href="/genre/{genre.id.value}">{genre.name}</a>
