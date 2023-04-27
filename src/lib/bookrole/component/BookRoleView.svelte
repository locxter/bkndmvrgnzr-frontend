<script lang="ts">
    import type { ContributorResponseDto } from '$lib/contributor/api/contributor-response-dto';
    import ContributorList from '$lib/contributor/component/ContributorList.svelte';
    import { BookRoleResponseDto } from '../api/book-role-response-dto';

    export let bookRole: BookRoleResponseDto = new BookRoleResponseDto();

    let contributors: ContributorResponseDto[] = [];

    $: contributors = bookRole.bookContributors.map((it) => it.contributor as ContributorResponseDto);
</script>

<h2>{bookRole.name}</h2>
<p>Contributors:</p>
<ContributorList {contributors} />
