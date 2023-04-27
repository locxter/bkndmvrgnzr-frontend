<script lang="ts">
    import { MovieRoleBrief } from '../db/movie-role-brief';

    export let movieRole: MovieRoleBrief = new MovieRoleBrief();
</script>

<a href="/movie-role/{movieRole.id.value}">{movieRole.name}</a>
