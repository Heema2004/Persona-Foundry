const fields = foundry.data.fields;

/**
 * Data model for the "character" Actor type.
 * Represents a player-controlled protagonist. Combat stats are NOT stored
 * here directly -- they come from whichever Persona is currently active,
 * except for hp/sp, which live on the character and are shared with
 * whichever Persona they're currently controlling.
 */
export default class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      level: new fields.NumberField({
        required: true,
        integer: true,
        min: 1,
        initial: 1
      }),
      xp: new fields.NumberField({
        required: true,
        integer: true,
        min: 0,
        initial: 0
      }),

      // Set once at character creation (or on leader death). Drives whether
      // the personaRoster / fusion UI is shown on this character's sheet.
      isLeader: new fields.BooleanField({
        required: true,
        initial: false
      }),

      // Which Persona this character currently has summoned/equipped.
      activePersonaId: new fields.DocumentIdField({
        nullable: true,
        initial: null
      }),

      // Only populated/used when isLeader is true. Array of Persona Actor
      // ids this character has bonded with and can switch between.
      personaRoster: new fields.ArrayField(
        new fields.DocumentIdField()
      ),

      // Authoritative hp/sp pool used in combat whenever this character's
      // active Persona is "controlled" (see PersonaData#isControlled).
      hp: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 10 }),
        max: new fields.NumberField({ integer: true, initial: 10 })
      }),
      sp: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 5 }),
        max: new fields.NumberField({ integer: true, initial: 5 })
      })
    };
  }
}
