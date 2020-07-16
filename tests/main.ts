import assert from "assert";
import { Meteor } from "meteor/meteor";

describe("betmen", function (): void {
  it("package.json has correct name", async function (): Promise<void> {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "betmen");
  });

  if (Meteor.isClient) {
    it("client is not server", function (): void {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function (): void {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
