import type { KaruppuForm } from "./types";
import { sangili } from "./sangili/manifest";
import { periya } from "./periya/manifest";
import { chinna } from "./chinna/manifest";
import { mangadu } from "./mangadu/manifest";
import { sangani } from "./sangani/manifest";
import { vettai } from "./vettai/manifest";

/**
 * The roster — the only thing the app imports. Registration order is the order
 * of descent on the Threshold and the numbering (01–06). To add a god: drop a
 * new services/karuppu/<id>/manifest.ts and add one line here.
 */
export const forms: KaruppuForm[] = [
  sangili,
  periya,
  chinna,
  mangadu,
  sangani,
  vettai,
];

const byId = new Map<string, KaruppuForm>(forms.map((f) => [f.id, f]));

/** Resolve a god by id (the sanctum routes' lookup). */
export const formById = (id: string): KaruppuForm | undefined => byId.get(id);


