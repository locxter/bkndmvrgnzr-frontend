<script lang="ts">
    import { page } from '$app/stores';

    let isan: string;

    page.subscribe((data) => {
        isan = data.params.isan;
    });
</script>

<p>TODO</p>
