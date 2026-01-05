import { DataStore } from "@sv443-network/coreutils";
import { compressionFormat } from "@/constants.js";
import type { ScriptConfig } from "@/types.js";
import { GMStorageEngine } from "@utils/GMStorageEngine.js";

export const configStore = new DataStore({
  // unique ID used to identify this DataStore's data:
  id: "config",
  // add initial and default data here:
  defaultData: {
    // ...
  } satisfies ScriptConfig,
  // increment this value if the data format changes:
  formatVersion: 1,
  // storage engine to use:
  engine: () => new GMStorageEngine(),
  // functions that migrate data from older versions to newer ones:
  migrations: {
    // e.g. migration from v1 to v2:
    // 2: (oldData) => {
    //   delete oldData.someOldProp;            // delete obsolete prop
    //   return { ...oldData, newProp: "foo" }; // add new prop
    // },
  },
  compressionFormat,
});

/** Initializes the configuration DataStore by loading data from storage. */
export async function initConfig() {
  await configStore.loadData();
}
