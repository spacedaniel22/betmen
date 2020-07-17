<script>
    import { Resolutions } from "../api/resolutions";
    import { beforeUpdate } from "svelte"
    
    export let resolution;

    let updateResolutionName = "";
    let inEdit = false;
    $: isTitleSame = updateResolutionName === resolution.title;

    function deleteResolution() {
        Resolutions.remove(resolution._id);
        inEdit = false;
    }

    function handleUpdate(event) {
        inEdit = false;
        if (!updateResolutionName.replace(/\s/g, '') || isTitleSame) {
            return;
        }
        Resolutions.update(
            { _id: resolution._id },
            { title: updateResolutionName },
        );
        updateResolutionName = "";
    }

    function toggleEdit() {
        inEdit = !inEdit;
        updateResolutionName = resolution.title;
    }

</script>

<style>
    :root {
        --title-font-size: 1.6rem;
        --icon-button-size: 1.4rem;
    }

    li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: fit-content;
        min-height: 5rem;
        padding-bottom: 2rem;
        margin-bottom: 2rem;
        border-bottom: var(--form-element-border-width) solid var(--strong-color);
    }

    li:last-of-type {
        border-bottom: none;
    }

    .title {
        font-size: var(--title-font-size);
        flex: 1 1;
        font-weight: 500;
        color: var(--strong-color-dark);
    }

    form {
        flex: 1 1;
    }

    input {
        padding-left: 0;
        width: 100%;
    }

    .icons {
        flex: 0 1 auto;
        line-height: 1;
        margin-left: 1rem;
    }

    .icon-button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 3em;
        height: 3em;
        font-size: var(--icon-button-size);
        margin-left: 0.5em;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        border: var(--form-element-border-width) solid var(--strong-color);
        /* background-color: var(--light-color); */
        /* box-shadow: 0.06em 0.06em 0.3em -0.06em rgba(0, 0, 0, 0.5); */
    }

    @media only screen and (min-width: 640px) {
        :root {
            --icon-button-size: 1.3rem;
        }
    }

    i {
        font-style: normal;
        font-size: 0.9em;
    }
</style>

<li>
    {#if inEdit}
        <form on:submit|preventDefault={handleUpdate}>
            <input type="text" class="title" bind:value={updateResolutionName} />
        </form>
    {:else}
        <span class="title">{resolution.title}</span>
    {/if}
    <div class="icons">
        {#if inEdit}
            <div class="icon-button" on:click={handleUpdate}><i>👌</i></div>
            <div class="icon-button" on:click={toggleEdit}><i>✖︎</i></div>
        {:else}
            <div class="icon-button" on:click={toggleEdit}><i>✏️</i></div>
            <div class="icon-button" on:click={deleteResolution}><i>🗑</i></div>
        {/if}
    </div>
</li>