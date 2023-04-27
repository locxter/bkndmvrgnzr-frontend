<script lang="ts">
    import { User } from '../db/user';

    export let userUpdate: User = new User();
</script>

<p>
    <label for="username">Username*:</label>
    <br />
    <input id="username" type="text" maxlength="32" placeholder="Username" bind:value={userUpdate.username} />
</p>
<p>
    <label for="first-name">First name:</label>
    <br />
    <input id="first-name" type="text" placeholder="First name" bind:value={userUpdate.firstName} />
</p>
<p>
    <label for="last-name">Last name:</label>
    <br />
    <input id="last-name" type="text" placeholder="Last name" bind:value={userUpdate.lastName} />
</p>
<p>* Required</p>
