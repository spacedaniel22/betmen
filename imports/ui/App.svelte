<script>
    import { useTracker } from "meteor/rdb:svelte-meteor-data";
    import { Resolutions } from "../api/resolutions";
    import { LoginWindow, Logout } from "meteor/levelup:svelte-accounts-ui";
    import Resolution from "./Resolution.svelte";

    let newRes = "";
    $: resolutions = useTracker(() => Resolutions.find({}).fetch());
    $: user = useTracker(() => Meteor.user());
    $: userEmail = $user && $user.emails ? $user.emails[0].address : undefined;
    $: userNickName = userEmail ? userEmail.substring(0, userEmail.indexOf("@")) : undefined;

    function handleSubmit(event) {
        Resolutions.insert({
            title: newRes,
        });

        newRes = "";
    }
</script>

<style>
    .userSection {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    h1 {
        display: inline-block;
        font-size: 1.6rem;
        padding-right: 1em;
        margin: 0;
        font-weight: 300;
    }

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
        align-items: stretch;
        justify-content: center;
        padding-top: 4rem;
        padding-bottom: 4rem;
        width: 100%;
    }

    form button {
        margin-left: 0.5rem;
    }

    ul {
        width: 100%;
        list-style: none;
        padding: 1rem 0;
        margin: 0;
    }
</style>

<main>
    <div class="userSection">
        {#if userEmail}
            <h1>Hellóka {userNickName}</h1>
            <Logout />
        {:else}
            <LoginWindow />
        {/if}
    </div>
    <section>
        <form on:submit|preventDefault={handleSubmit}>
            <input type="text" placeholder="Add your resolution" bind:value={newRes} />
            <button>Add new</button>
        </form>
        <ul>
            {#each $resolutions as resolution}
                <Resolution {resolution} />
            {/each}
        </ul>
    </section>
</main>