<script lang="ts">
    import { MovieUpdateDto } from '../api/movie-update-dto';

    export let movieUpdate: MovieUpdateDto = new MovieUpdateDto();
</script>

<p>
    Title:
    <br />
    <input type="text" placeholder="Title" bind:value={movieUpdate.title} />
</p>
<p>
    Description:
    <br />
    <input type="text" placeholder="Description" bind:value={movieUpdate.description} />
</p>
<p>
    Year:
    <br />
    <input type="number" min="0" placeholder="Year" bind:value={movieUpdate.year} />
</p>
<p>
    Play time:
    <br />
    <input type="number" min="0" placeholder="Play time" bind:value={movieUpdate.playTime} />
</p>
<p>
    Age restriction:
    <br />
    <input type="number" min="0" placeholder="Age restriction" bind:value={movieUpdate.ageRestriction} />
</p>
<p>Genres:</p>
<ul>
    <li>TODO</li>
</ul>
<p>Contributors:</p>
<ul>
    <li>TODO</li>
</ul>
