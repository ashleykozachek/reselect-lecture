import { createSelector } from 'reselect';

/*
 *
 * Derived state is a combination of states in the application.
 * In React, typically derived states drive UI elements directly.
 * In this Contrived Example™ we're going to pretend we're making
 * an RPG, with UI elements driven depending on the player's
 * chosen class, name, current hitpoints, and whether or not.
 * the character has shuffled off her mortal coil.
 * 
 */

const characterClasses = {
  rogue: {
    hp: 5,
    atk: 4,
    mAtk: 1,
  },
  fighter: {
    hp: 10,
    atk: 3,
    mAtk: 0,
  },
  mage: {
    hp: 3,
    atk: 1,
    mAtk: 4,
  },
  javascriptWizard: {
    hp: 9001,
    atk: 0,
    mAtk: 500,
  }
};

const state = {
  chosenClass: 'Fighter',
  characterName: 'Bob',
  damageTaken: 0,
};

// NOTE: We aren't storing current hitpoints directly and we aren't using a traditional OOP Class.
// We don't need to. And our state is *very* small compared to the amount of information we can
// derive from it.
// ALSO NOTE: Reselect does not require Redux to work

// I'm not using an arrow function, I have reasons.
function getName(state) {
  return state.name;
}

function getClassname(state) {
  return state.chosenClass;
}

function getDamageTaken(state) {
  return state.damageTaken;
}

const getClass = createSelector(
  [getClassname],
  (class) => characterClasses[class]
);

const getCurrentHp = createSelector(
  [getDamageTaken, getClass],
  (damage, class) => class.hp - damageTaken
);

const getAtk = createSelector(
  [getClass],
  (class) => class.atk
);

const getMAtk = createSelector(
  [getClass],
  (class) => class.mAtk
);

const getIsDeceased = createSelector(
  [getCurrentHp],
  (hp) => hp <= 0
);

// Now for the reselect!
const getCharacterSheet = createSelector(
  [
    getName,
    getClassname,
    getClass,
    getCurrentHp,
    getIsDeceased,
  ],
  (
    name,
    classname,
    class,
    hp,
    deceased,
  ) => ({
    "Name": name,
    "Class": classname,
    "ATK": class.atk,
    "M ATK": class.matk,
    "Hit Points": [hp, class.hp],
    "Deceased": deceased,
  });
);
