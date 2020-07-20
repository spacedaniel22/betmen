<script>
    import { onMount } from "svelte";
    import { useTracker } from "meteor/rdb:svelte-meteor-data";
    import ResolutionContainer from "./ResolutionContainer.svelte";
    import { Resolutions } from "../api/resolutions";

    let newRes = "";
    $: resolutions = useTracker(() => Resolutions.find({}).fetch());
    $: completedResolutions = $resolutions.filter((r) => r.completed);
    $: todoResolutions = $resolutions.filter((r) => !r.completed);
    
    onMount(() => {
        Meteor.subscribe("getResolutionsForUser");
    });
    function handleSubmit(event) {
        if (!newRes) {
            return;
        }
        Meteor.call("insertResolution", newRes);
        newRes = "";
    }
</script>

<style>
    section {
        max-width: 100vw;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    @media only screen and (min-width: 640px) {
        section {
            max-width: 70vw;
        }
    }

    @media only screen and (min-width: 1100px) {
        section {
            max-width: 50vw;
        }
    }

    @media only screen and (min-width: 1600px) {
        section {
            max-width: 30vw;
        }
    }

    form {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 4rem;
        padding-bottom: 4rem;
        width: 100%;
    }

    form button {
        margin-left: 0.5rem;
    }
</style>

<section>
    <form on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="Add your resolution" bind:value={newRes} />
        <button>Add new</button>
    </form>
    <ResolutionContainer resolutions={todoResolutions} title={"Todo"} />
    <ResolutionContainer resolutions={completedResolutions} title={"Completed"} />
</section>