<script lang="ts">
    import type { PasswordUpdateDto } from '../api/password-update-dto';

    export let passwordUpdate: PasswordUpdateDto;
</script>

<p>
    <label for="password">Password*:</label>
    <br />
    <input id="password" type="password" maxlength="64" placeholder="Password" bind:value={passwordUpdate.password} />
</p>
<p>
    <label for="new-password">New password*:</label>
    <br />
    <input
        id="new-password"
        type="password"
        maxlength="64"
        placeholder="New password"
        bind:value={passwordUpdate.newPassword}
    />
</p>
<p>
    <label for="confirm-new-password">Confirm new password*:</label>
    <br />
    <input
        id="confirm-new-password"
        type="password"
        maxlength="64"
        placeholder="Confirm new password"
        bind:value={passwordUpdate.confirmNewPassword}
    />
</p>
<p>* Required</p>
