import { Mongo } from "meteor/mongo";

export interface IResolution extends Mongo.OptionalId<IResolution> {
    readonly completed: boolean;
    readonly title: string;
    readonly userId: string;
}

export const Resolutions: Mongo.Collection<IResolution> = new Mongo.Collection<IResolution>("resolutions");
