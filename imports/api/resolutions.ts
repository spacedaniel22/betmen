import { Mongo } from "meteor/mongo";

export interface IResolution {
    readonly title: string;
}

export const Resolutions: Mongo.Collection<IResolution> = new Mongo.Collection<IResolution>("resolutions");
