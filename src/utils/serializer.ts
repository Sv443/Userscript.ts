import { ChecksumMismatchError, DataStoreSerializer } from "@sv443-network/coreutils";
import { configStore } from "@/config.js";
import { downloadFile } from "@utils/dom.js";
import { t } from "@utils/translations.js";
import packageJson from "@root/package.json" with { type: "json" };

/**
 * Serializer for all DataStores used in the userscript.  
 * This makes it easy to run bulk operations like load, import, export and delete on all or specific stores.
 */
export const serializer = new DataStoreSerializer([
  configStore,
]);

/** Imports data from a file into all matching data stores. */
export async function importData(blob: File | Blob) {
  try {
    const data = await blob.text();
    await serializer.deserialize(data);

    if(confirm(t("serializer.import.success_reload_prompt")))
      location.reload();
  }
  catch(err) {
    console.error("Error while importing serialized DataStores:", err);

    if(err instanceof TypeError)
      alert(t("serializer.import.error_no_data"));
    else if(err instanceof ChecksumMismatchError)
      alert(t("serializer.import.error_checksum_mismatch"));
    else
      alert(t("serializer.import.error_invalid"));
  }
}

/** Downloads all data stores as a single file. */
export async function downloadData(useEncoding = true) {
  const fileName = t("serializer.export.file_name", { version: packageJson.version, date: new Date().toISOString() });
  const data = JSON.stringify(JSON.parse(await serializer.serialize(useEncoding)), undefined, 2);

  downloadFile(fileName, data, "application/json");
}
