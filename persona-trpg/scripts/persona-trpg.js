import CharacterData from "./data/character-data.mjs";
import PersonaData from "./data/persona-data.mjs";
import SkillData from "./data/skill-data.mjs";
import TraitData from "./data/trait-data.mjs";

Hooks.once("init", () => {
  console.log("Persona TRPG | Initializing system");

  // Register Actor subtype DataModels. The keys here ("character",
  // "persona") must exactly match the type names declared under
  // documentTypes.Actor in system.json.
  CONFIG.Actor.dataModels = {
    character: CharacterData,
    persona: PersonaData
  };

  // Register Item subtype DataModels. Same rule: keys must match
  // documentTypes.Item in system.json.
  CONFIG.Item.dataModels = {
    skill: SkillData,
    trait: TraitData
  };
});