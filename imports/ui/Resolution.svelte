<script>import { debug } from "svelte/internal";

    import { Resolutions } from "../api/resolutions";
    import { beforeUpdate } from "svelte"
    import CustomCheckbox from "./CustomCheckbox.svelte";
    
    export let resolution;

    let updateResolutionName = "";
    let inEdit = false;
    $: isTitleSame = updateResolutionName === resolution.title;

    function deleteResolution() {
        Meteor.call("deleteResolution", resolution._id);
    }

    function handleTitleUpdate(event) {
        if (!updateResolutionName.replace(/\s/g, '') || isTitleSame) {
            inEdit = false;
            return;
        }
        Meteor.call("updateResolution", { ...resolution, title: updateResolutionName }, () => {
            inEdit = false;
        });
    }

    function toggleEdit() {
        inEdit = !inEdit;
        updateResolutionName = resolution.title;
    }

    function toggleChecked() {
        if (inEdit) {
            toggleEdit();
        }
        Meteor.call("updateResolution", { ...resolution, completed: !resolution.completed });
    }

    function putOnFocus(node) {
        node.focus();
    }
</script>

<style>
    :root {
        --title-font-size: 1.4rem;
        --icon-button-size: 1.5rem;
    }

    .item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: fit-content;
        min-height: 5rem;
        padding-bottom: 2rem;
        margin-bottom: 2rem;
        border-bottom: var(--form-element-border-width) solid var(--dark-gray);
    }

    .item:last-of-type {
        border-bottom: none;
        margin-bottom: 0;
    }

    .title {
        font-size: var(--title-font-size);
        flex: 1 1;
        font-weight: 500;
    }
    
    .title.displaying {
        cursor: text;
        color: var(--yellow-main-dark);
    }

    .title.displaying.completed {
        text-decoration: line-through;
    }

    form {
        flex: 1 1;
    }

    input {
        position: relative;
        padding: 0.5rem 0.5rem 0.5rem 0;
        width: 100%;
        border-radius: 0;
        border: none;
        outline: var(--form-element-border-width) dashed var(--light-gray);
        color: var(--green-dark-harsh);
        transition: all ease-in-out 0.2s;
    }
    
    input:focus {
        outline-color: var(--dark-gray);
    }

    .icons {
        flex: 0 1 auto;
        display: flex;
        line-height: 1;
        margin-left: 1rem;
    }

    .icon-button {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.5em;
        height: 2.5em;
        font-size: var(--icon-button-size);
        margin-left: 0.5em;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        border: var(--form-element-border-width) solid var(--yellow-main);
        /* background-color: var(--light-gray);*/ 
        /* box-shadow: 0.06em 0.06em 0.3em -0.06em rgba(0, 0, 0, 0.5); */
    }

    @media only screen and (min-width: 375px) {
        :root {
            --icon-button-size: 1.6rem;
        }
    }

    i {
        font-size: 0.8em;
    }

    .cancel i {
        color: var(--yellow-dark);
    }
</style>

<div class="item">
    <CustomCheckbox
        checked={resolution.completed}
        onChange={toggleChecked}
    />
    {#if inEdit}
        <form on:submit|preventDefault={handleTitleUpdate}>
            <input
                type="text"
                class="title"
                bind:value={updateResolutionName}
                use:putOnFocus
            />
        </form>
    {:else}
        <span
            class="title displaying"
            class:completed={resolution.completed}
            on:click={toggleEdit}
        >
            {resolution.title}
        </span>
    {/if}
    <div class="icons">
        {#if inEdit}
            <div class="icon-button" on:click={handleTitleUpdate}><i>👌</i></div>
            <div class="icon-button cancel" on:click={toggleEdit}><i>✖︎</i></div>
        {:else}
            <div class="icon-button" on:click={deleteResolution}><i>🗑</i></div>
        {/if}
    </div>
</div>