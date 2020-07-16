import { Meteor } from "meteor/meteor";
import App from "../imports/ui/App.svelte";

Meteor.startup((): void => {
    new App({
      target: document.getElementById("app")!,
    });
});
