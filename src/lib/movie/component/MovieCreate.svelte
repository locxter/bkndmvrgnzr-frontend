<script lang="ts">
    import { MovieCreateDto } from '../api/movie-create-dto';

    export let movieCreate: MovieCreateDto = new MovieCreateDto();
</script>

<p>
    ISAN:
    <br />
    <input type="text" placeholder="ISBN" bind:value={movieCreate.isan} />
</p>
<p>
    Description:
    <br />
    <input type="text" placeholder="Description" bind:value={movieCreate.description} />
</p>
<p>
    Year:
    <br />
    <input type="number" min="0" placeholder="Year" bind:value={movieCreate.year} />
</p>
<p>
    Play time:
    <br />
    <input type="number" min="0" placeholder="Play time" bind:value={movieCreate.playTime} />
</p>
<p>
    Age restriction:
    <br />
    <input type="number" min="0" placeholder="Age restriction" bind:value={movieCreate.ageRestriction} />
</p>
<p>Genres:</p>
<ul>
    <li>TODO</li>
</ul>
<p>Contributors:</p>
<ul>
    <li>TODO</li>
</ul>
