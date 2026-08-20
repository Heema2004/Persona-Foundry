const fields = foundry.data.fields;

export const DAMAGE_TYPES = [
  "slash", "pierce", "strike",
  "fire", "ice", "lightning", "wind",
  "light", "dark"
];

export const RESISTANCE_LEVELS = [
  "weak", "resist", "null", "drain", "reflect", "normal"
];

/**
 * Builds a SchemaField with one StringField per damage type, each
 * constrained to the valid resistance levels. Used by PersonaData.
 */
function buildResistanceSchema() {
  const schema = {};
  for (const type of DAMAGE_TYPES) {
    schema[type] = new fields.StringField({
      required: true,
      choices: RESISTANCE_LEVELS,
      initial: "normal"
    });
  }
  return new fields.SchemaField(schema);
}

/**
 * Data model for the "persona" Actor type.
 * Used for BOTH wild/enemy encounters and player-bonded Personas --
 * the only difference is whether controllerId is set.
 */
export default class PersonaData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      arcana: new fields.StringField({
        required: true,
        initial: ""
      }),

      // Core stats
      st: new fields.NumberField({ integer: true, min: 0, initial: 1 }),
      mg: new fields.NumberField({ integer: true, min: 0, initial: 1 }),
      en: new fields.NumberField({ integer: true, min: 0, initial: 1 }),
      ag: new fields.NumberField({ integer: true, min: 0, initial: 1 }),
      lu: new fields.NumberField({ integer: true, min: 0, initial: 1 }),

      level: new fields.NumberField({
        required: true,
        integer: true,
        min: 1,
        initial: 1
      }),

      resistances: buildResistanceSchema(),

      // Only authoritative when controllerId is null (wild Persona).
      // When controlled, sheets/rolls should read the controller
      // character's hp/sp instead -- see the isControlled getter below.
      hp: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 10 }),
        max: new fields.NumberField({ integer: true, initial: 10 })
      }),
      sp: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 5 }),
        max: new fields.NumberField({ integer: true, initial: 5 })
      }),

      // Nullable reference to a "character" Actor. If set, this Persona
      // is bonded to that character and its turn replaces theirs in combat.
      controllerId: new fields.DocumentIdField({
        nullable: true,
        initial: null
      })
    };
  }

  /**
   * True if this Persona is currently bonded to (and acting on behalf of)
   * a character, rather than being a standalone wild encounter.
   */
  get isControlled() {
    return this.controllerId !== null;
  }
}
