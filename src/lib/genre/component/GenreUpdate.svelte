<script lang="ts">
    import { GenreUpdateDto } from '../api/genre-update-dto';

    export let genreUpdate: GenreUpdateDto = new GenreUpdateDto();
</script>

<p>
    Name*:
    <br />
    <input type="text" placeholder="Name" bind:value={genreUpdate.name} />
</p>
<p>* Required</p>
