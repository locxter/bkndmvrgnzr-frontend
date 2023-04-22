<script lang="ts">
    import { GenreResponseDto } from '../api/genre-response-dto';

    export let genre: GenreResponseDto = new GenreResponseDto();
</script>

<a href="/genre/{genre.id}">{genre.name}</a>
