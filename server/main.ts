import { Meteor } from "meteor/meteor";
import {Resolutions} from "../imports/api/resolutions";

Meteor.startup((): void => {
    // startup code on server
    console.log(Resolutions.find().count());
});
