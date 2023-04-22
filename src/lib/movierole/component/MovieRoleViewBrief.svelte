<script lang="ts">
    import { MovieRoleResponseDto } from '../api/movie-role-response-dto';

    export let movieRole: MovieRoleResponseDto = new MovieRoleResponseDto();
</script>

<a href="/movie-role/{movieRole.id}">{movieRole.name}</a>
