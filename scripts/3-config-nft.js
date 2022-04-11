import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0x9Ebb9919ed5d4f41c6d58a1efCAd88DE198b6a59");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Gear Five Luffy",
        description: "This NFT will give you access to LuffyDAO!",
        image: readFileSync("scripts/assets/sun-god-luffy.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();