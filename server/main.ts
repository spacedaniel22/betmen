import { Meteor } from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import { IResolution, Resolutions } from "../imports/api/resolutions";

Meteor.startup((): void => {
    Meteor.publish("getResolutionsForUser", function(): Mongo.Cursor<IResolution> | void {
        if (!this.userId) {
            return this.ready();
        }

        return Resolutions.find(
            { userId: this.userId },
        );
    });

    Meteor.methods({
        insertResolution(title: string): void {
            Resolutions.insert({
                completed: false,
                title,
                userId: this.userId!,
            });
        },
        updateResolution({ _id, ...resolution }: IResolution): void {
            Resolutions.update(
                { _id },
                resolution,
            );
        },
        deleteResolution(id: string): void {
            Resolutions.remove(id);
        },
    });
});
