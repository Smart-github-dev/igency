let data = {
  map: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  players: [],
  bullets: [],
  buildings: [],
  plants: [],
  bullets: [],
  rules: {
    players: {
      speed: 1.7,
      body: {
        size: 70,
      },
      hands: {
        hitSpeed: 150,
        hitRange: 5,
        left: {
          size: 27,
          offset: {
            x: 25,
            y: 30,
          },
        },
        right: {
          size: 27,
          offset: {
            x: -25,
            y: 30,
          },
        },
      },
    },
    weapons: {
      melees: [
        {
          type: "melee",
          id: "hands",
          slot: "hands_slot",
          loot: "hands_loot",
          offsetX: 0,
          offsetY: 0,
          width: 27,
          height: 27,
          angle: 0,
          distance: 0,
        },
        {
          type: "melee",
          id: "knife",
          slot: "knife_slot",
          loot: "knife_loot",
          offsetX: 10,
          offsetY: 20,
          width: 37,
          height: 80,
          angle: -(Math.PI * 1.2),
          distance: 0,
        },
        {
          type: "melee",
          id: "dagger",
          slot: "dagger_slot",
          loot: "dagger_loot",
          offsetX: 10,
          offsetY: 20,
          width: 24,
          height: 80,
          angle: -(Math.PI * 0.2),
          distance: 0,
        },
        {
          type: "melee",
          id: "long_sword",
          slot: "long_sword_slot",
          loot: "long_sword_loot",
          offsetX: 25,
          offsetY: 40,
          width: 40,
          height: 150,
          angle: -(Math.PI * 0.2 + Math.PI),
          distance: 0,
        },
      ],
      guns: [
        {
          type: "guns",
          id: "pistol",
          slot: "pistol_slot",
          loot: "pistol_loot",
          offsetX: 7,
          offsetY: 30,
          width: 25,
          height: 100,
          angle: 0,
          bullets: {
            count: 100,
            lastdt: 0,
            reloadt: 800, //0.8s
            speed: 40,
            effective_range: 800, //100m
            damage: 10,
          },
        },
        {
          type: "guns",
          id: "m16",
          slot: "m16_slot",
          loot: "m16_loot",
          offsetX: 15,
          offsetY: 60,
          width: 30,
          height: 230,
          angle: 0,
          bullets: {
            count: 1000,
            reloadt: 100,
            lastdt: 0,
            speed: 40,
            effective_range: 1200,
            damage: 5,
          },
        },
      ],
    },
    map: {
      tiles: {
        size: 400,
      },
    },
  },
  hands: [
    {
      hitSpeed: 150,
      hitRange: 5,
      left: {
        size: 27,
        offset: {
          x: 25,
          y: 30,
        },
      },
      right: {
        size: 27,
        offset: {
          x: -25,
          y: 30,
        },
      },
    },
    {
      hitSpeed: 150,
      hitRange: 4,
      left: {
        size: 27,
        offset: {
          x: 10,
          y: 70,
        },
      },
      right: {
        size: 27,
        offset: {
          x: -15,
          y: 30,
        },
      },
    },
  ],
};

module.exports = data;
