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
    li {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 2rem;    
    }

    li:last-of-type {
        padding-bottom: 0;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        flex: 1 1;
    }

    .title {
        flex: 1 1;
        font-size: 1.8rem;
    }

    button {
        height: max-content;
        margin-left: 0.5rem;
    }
</style>

<li>
        {#if inEdit}
            <form on:submit|preventDefault={handleUpdate}>
                <input type="text" class="title" bind:value={updateResolutionName} />
                <button>{isTitleSame ? "Cancel" : "Update"}</button>
            </form>
        {:else}
            <span class="title">{resolution.title}</span>
            <button on:click={toggleEdit}>Edit</button>
        {/if}

    <button on:click={deleteResolution}>Delete</button>
</li>