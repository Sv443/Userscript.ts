import type { LooseUnion, Stringifiable } from "@sv443-network/coreutils";
import { tr, type TrKeys } from "@sv443-network/userutils";
import type tr_enUS from "@assets/translations/en-US.json";

// This file includes translation boilerplate powered by UserUtils.
// I highly recommend checking out the documentation:
// https://github.com/Sv443-Network/UserUtils/blob/main/docs.md#translation

/** Supported language codes. Should match the [IETF / BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) format. */
type LangCode = "en-US";
//| "en-GB"
//| "de-DE";

type TrKey = TrKeys<typeof tr_enUS>;

// Add useful transforms:
// Percent, e.g. "Hello %1, you have %2 new messages."
tr.addTransform(tr.transforms.percent);
// Template literal, e.g. "Hello ${name}, you have ${count} new messages."
tr.addTransform(tr.transforms.templateLiteral);
// Sky's the limit! To create your own transforms, check out the docs:
// https://github.com/Sv443-Network/UserUtils/blob/main/docs.md#traddtransform

// If a key isn't found in the current language, fall back to US-English:
tr.setFallbackLanguage("en-US");

let lang: LangCode = "en-US";

/**
 * Returns the translated text for the specified key in the currently set language after applying all matching transforms, including argument insertion.  
 * If the key is not found in the specified previously registered translation or the fallback translation, the key itself is returned.
 */
export function t(key: LooseUnion<TrKey>, ...args: (Stringifiable | Record<string, Stringifiable>)[]) {
  return tr.for(lang, key, ...args);
}

/** Sets the current language */
export function setLanguage(newLang: LangCode) {
  lang = newLang;
}

/** Returns the currently set language */
export function getLanguage() {
  return lang;
}
