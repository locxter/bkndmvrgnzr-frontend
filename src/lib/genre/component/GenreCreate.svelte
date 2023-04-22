<script lang="ts">
    import { GenreCreateDto } from '../api/genre-create-dto';

    export let genreCreate: GenreCreateDto = new GenreCreateDto();
</script>

<p>
    Name:
    <br />
    <input type="text" placeholder="Name" bind:value={genreCreate.name} />
</p>
