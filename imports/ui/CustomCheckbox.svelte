<script>
    export let checked;
    export let onChange;
</script>

<style>
    /* Customize the label (the container) */
    label {
        position: relative;
        display: inline-block;
        font-size: 1rem;
        width: 2.5em;
        height: 2.5em;
        margin-right: 1em;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    label input {
        position: absolute;
        visibility: hidden;
    }

    /* Create a custom checkbox */
    span {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background-color: var(--light-gray);
        border-radius: 50%;
    }

    /* On mouse-over, add a grey background color */
    label:hover input ~ span i {
        opacity: 0.5;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    span i {
        opacity: 0;
        font-size: 1.2em;
        background-color: var(--green-light);
        width: 60%;
        height: 60%;
        border-radius: 50%;
        transition: all ease-in-out 0.2s;
    }
    
    /* Show the checkmark when checked */
    label input:checked ~ span i {
        opacity: 1;
    }
</style>

<label>
    <input type="checkbox" bind:checked={checked} on:change={onChange}>
    <span><i></i></span>
</label>