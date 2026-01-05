import { DataStoreEngine, type DataStoreData, type DataStoreEngineDSOptions, type SerializableVal } from "@sv443-network/coreutils";

/** Options for the {@linkcode GMStorageEngine} class */
export type GMStorageEngineOptions = {
  /**
   * Specifies the necessary options for storing data.  
   * - ⚠️ Only specify this if you are using this instance standalone! The parent `DataStore` will set this automatically.
   */
  dataStoreOptions?: DataStoreEngineDSOptions<DataStoreData>;
};

/**
 * Storage engine for the `DataStore` class that uses the GM (GreaseMonkey) storage API.
 *   
 * - ⚠️ Don't reuse engine instances, always create a new one for each {@linkcode DataStore} instance
 */
export class GMStorageEngine<TData extends DataStoreData> extends DataStoreEngine<TData> {
  protected options: GMStorageEngineOptions;

  /**
   * Creates an instance of `GMStorageEngine`.  
   *   
   * - ⚠️ Don't reuse engine instances, always create a new one for each {@linkcode DataStore} instance
   */
  constructor(options?: GMStorageEngineOptions) {
    super(options?.dataStoreOptions);
    this.options = {
      ...options,
    };
  }

  //#region storage api

  /** Fetches a value from persistent storage */
  public async getValue<TValue extends SerializableVal = string>(name: string, defaultValue: TValue): Promise<string | TValue> {
    return GM.getValue(name, defaultValue);
  }

  /** Sets a value in persistent storage */
  public async setValue(name: string, value: SerializableVal): Promise<void> {
    await GM.setValue(name, value as GM.Value);
  }

  /** Deletes a value from persistent storage */
  public async deleteValue(name: string): Promise<void> {
    await GM.deleteValue(name);
  }
}
