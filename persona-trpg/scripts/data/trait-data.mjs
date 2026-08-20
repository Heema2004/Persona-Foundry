const fields = foundry.data.fields;

/**
 * Data model for the "trait" Item type -- a single innate passive a
 * persona has, similar to a Pokemon ability. Separate from skills:
 * traits aren't swapped out and don't count against the 8-skill cap.
 */
export default class TraitData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new fields.HTMLField({ initial: "" }),

      // Free text for now describing the rules effect. Once you decide
      // how traits actually hook into automation (Active Effects, a
      // custom keyword system, etc.) this can evolve into something
      // more structured -- fine to leave as a plain string until then.
      mechanicalHook: new fields.StringField({ initial: "" })
    };
  }
}
