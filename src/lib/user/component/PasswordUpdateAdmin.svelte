<script lang="ts">
    import { PasswordUpdateAdminDto } from '../api/password-update-admin-dto';

    export let passwordUpdateAdmin: PasswordUpdateAdminDto = new PasswordUpdateAdminDto();
</script>

<p>
    <label for="new-password">New password:</label>
    <br />
    <input id="new-password" type="password" placeholder="New password" bind:value={passwordUpdateAdmin.newPassword} />
</p>
<p>
    <label for="confirm-new-password">Confirm new password:</label>
    <br />
    <input
        id="confirm-new-password"
        type="password"
        placeholder="Confirm new password"
        bind:value={passwordUpdateAdmin.confirmNewPassword}
    />
</p>
