const fields = foundry.data.fields;

// Reuse the same damage type list as personas so attack skills can
// reference a consistent set of options. Duplicated here (rather than
// imported) to keep item data models independent of actor data models --
// import from persona-data.mjs instead if you'd rather share one source.
const DAMAGE_TYPES = [
  "slash", "pierce", "strike",
  "fire", "ice", "lightning", "wind",
  "light", "dark"
];

/**
 * Data model for the "skill" Item type.
 * A persona can hold up to 8 of these -- enforcing that cap is sheet/UI
 * logic (step 5+), not something the data model itself restricts.
 */
export default class SkillData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      category: new fields.StringField({
        required: true,
        choices: ["attack", "support", "passive"],
        initial: "attack"
      }),

      spCost: new fields.NumberField({
        required: true,
        integer: true,
        min: 0,
        initial: 0
      }),

      // Only meaningful for category: "attack"
      damageType: new fields.StringField({
        required: false,
        choices: [...DAMAGE_TYPES, ""],
        initial: ""
      }),

      // Attack skills only
      power: new fields.NumberField({
        integer: true,
        min: 0,
        initial: 0
      }),

      targetType: new fields.StringField({
        choices: ["single", "all", "self", "ally", "allAllies"],
        initial: "single"
      }),

      description: new fields.HTMLField({ initial: "" })
    };
  }
}
