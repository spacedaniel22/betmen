<script>
    import Resolution from './Resolution.svelte';

    export let resolutions;
    export let title;
</script>

<style>
    h2 {
        font-weight: 600;
        padding-bottom: 1.5rem;
        margin: 0 0 2.5rem 0;
        color: var(--yellow-main-dark)
    }

    div {
        width: 100%;
        padding: 1rem 0;
    }
</style>

<div>
    <h2>{title}</h2>
    {#each resolutions as resolution}
        <Resolution {resolution} />
    {/each}
</div>