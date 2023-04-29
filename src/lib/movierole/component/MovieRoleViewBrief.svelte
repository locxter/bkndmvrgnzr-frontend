<script lang="ts">
    import type { MovieRoleBrief } from '../db/movie-role-brief';

    export let movieRole: MovieRoleBrief;
</script>

<a href="/movie-role/{movieRole.id.value}">{movieRole.name}</a>
