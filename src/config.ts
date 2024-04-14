import { DataStore, compress, decompress } from "@sv443-network/userutils";
import { compressionFormat } from "./constants";
import type { ScriptConfig } from "./types";

let canCompress: boolean | undefined;

export const config = new DataStore({
  id: "script-config",
  defaultData: {
    // add data here
  } satisfies ScriptConfig,
  // increment this value if the data format changes:
  formatVersion: 1,
  // functions that migrate data from older versions to newer ones:
  migrations: {
    // migrate from v1 to v2:
    // 2: (oldData) => {
    //   return { ...oldData, newProp: "foo" };
    // },
  },
  encodeData: (data) => canCompress ? compress(data, compressionFormat, "string") : data,
  decodeData: (data) => canCompress ? decompress(data, compressionFormat, "string") : data,
});

export async function initConfig() {
  canCompress = await compressionSupported();
  await config.loadData();
}

async function compressionSupported() {
  if(typeof canCompress === "boolean")
    return canCompress;
  try {
    await compress(".", compressionFormat, "string");
    return canCompress = true;
  }
  catch(e) {
    return canCompress = false;
  }
}
