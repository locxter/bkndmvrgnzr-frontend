<script lang="ts">
    import { UserResponseDto } from '../api/user-response-dto';

    export let user: UserResponseDto = new UserResponseDto();
</script>

<a href="/user/{user.id}">
    {user.username}
    {#if user.firstName && user.lastName}
        ({user.lastName}, {user.firstName})
    {/if}
</a>
