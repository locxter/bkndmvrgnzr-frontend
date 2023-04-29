<script lang="ts">
    import type { PasswordUpdateAdminDto } from '../api/password-update-admin-dto';

    export let passwordUpdateAdmin: PasswordUpdateAdminDto;
</script>

<p>
    <label for="new-password">New password*:</label>
    <br />
    <input
        id="new-password"
        type="password"
        maxlength="64"
        placeholder="New password"
        bind:value={passwordUpdateAdmin.newPassword}
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
        bind:value={passwordUpdateAdmin.confirmNewPassword}
    />
</p>
<p>* Required</p>
