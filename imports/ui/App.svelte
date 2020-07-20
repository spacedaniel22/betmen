<script>
    import { useTracker } from "meteor/rdb:svelte-meteor-data";
    import { LoginWindow, Logout } from "meteor/levelup:svelte-accounts-ui";
    import Content from "./Content.svelte";


    $: user = useTracker(() => Meteor.user());
    $: loggingIn = useTracker(() => Meteor.loggingIn())
    $: userEmail = $user && $user.emails ? $user.emails[0].address : undefined;
    $: userNickName = userEmail ? userEmail.substring(0, userEmail.indexOf("@")) : undefined;
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
</style>

<main>
    <div class="userSection">
        {#if userEmail}
            <header>
                <h1>Hellóka {userNickName}</h1>
                <Logout />
            </header>
        {:else if !$loggingIn}
            <LoginWindow />
        {/if}
    </div>
    {#if $user}
        <Content />
    {/if}
</main>