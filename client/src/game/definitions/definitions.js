import { settings } from "../../root/settings/settings.js";

let definitions = {
  ui: {
    joysticks: [
      {
        type: "joystick",
        id: "joystick_base",
        src: `packages/${settings.package}/images/game/ui/joysticks/joystick_base.svg`,
      },
      {
        type: "joystick",
        id: "joystick_stick",
        src: `packages/${settings.package}/images/game/ui//joysticks/joystick_stick.svg`,
      },
    ],
    healthbar: [
      {
        type: "healthbar",
        id: "healthbar_base",
        src: `packages/${settings.package}/images/game/ui/healthbar/healthbar_base.svg`,
      },
      {
        type: "healthbar",
        id: "healthbar_detail",
        src: `packages/${settings.package}/images/game/ui/healthbar/healthbar_detail.svg`,
      },
    ],
    slots: {
      system: [
        {
          type: "system",
          id: "slot",
          src: `packages/${settings.package}/images/game/ui/slots/system/slot.svg`,
        },
        {
          type: "system",
          id: "selected_slot",
          src: `packages/${settings.package}/images/game/ui/slots/system/selected_slot.svg`,
        },
      ],
      weapons: {
        melees: [
          {
            type: "melee",
            id: "hands_slot",
            src: `packages/${settings.package}/images/game/ui/slots/weapons/melees/hands_slot.svg`,
          },
          {
            type: "melee",
            id: "knife_slot",
            src: `packages/${settings.package}/images/game/ui/slots/weapons/melees/knife_slot.svg`,
          },
          {
            type: "melee",
            id: "dagger_slot",
            src: `packages/${settings.package}/images/game/ui/slots/weapons/melees/dagger_slot.svg`,
          },
          {
            type: "long_sword",
            id: "long_sword_slot",
            creator: "Rose",
            src: `packages/${settings.package}/images/game/ui/slots/weapons/melees/long_sword_slot.svg`,
          },
        ],
        guns: [
          {
            type: "guns",
            id: "pistol_slot",
            src: `packages/${settings.package}/images/game/ui/slots/weapons/guns/pistol_slot.svg`,
          },
          {
            type: "guns",
            id: "m16_slot",
            src: `packages/${settings.package}/images/game/ui/slots/weapons/guns/m16_slot.svg`,
          },
        ],
      },
    },
  },
  skins: [
    {
      type: "skin",
      id: "default_body",
      src: `packages/${settings.package}/images/game/skins/default_body.svg`,
    },
    {
      type: "skin",
      id: "default_hand_left",
      src: `packages/${settings.package}/images/game/skins/default_hand_left.svg`,
    },
    {
      type: "skin",
      id: "default_hand_right",
      src: `packages/${settings.package}/images/game/skins/default_hand_right.svg`,
    },
  ],
  weapons: {
    melees: [
      {
        type: "melee",
        id: "hands",
        src: `packages/${settings.package}/images/game/weapons/melees/hands.svg`,
      },
      {
        type: "melee",
        id: "knife",
        src: `packages/${settings.package}/images/game/weapons/melees/knife.svg`,
      },
      {
        type: "melee",
        id: "dagger",
        src: `packages/${settings.package}/images/game/weapons/melees/dagger.svg`,
      },
      {
        type: "melee",
        id: "long_sword",
        src: `packages/${settings.package}/images/game/weapons/melees/long_sword.svg`,
      },
    ],
    guns: [
      {
        type: "guns",
        id: "pistol",
        src: `packages/${settings.package}/images/game/weapons/guns/pistol.svg`,
      },
      {
        type: "guns",
        id: "m16",
        src: `packages/${settings.package}/images/game/weapons/guns/m16.svg`,
      },
    ],
  },
  map: {
    tiles: [
      {
        type: "tile",
        id: "grass_tile",
        src: `packages/${settings.package}/images/game/map/tiles/grass.svg`,
      },
    ],
  },
};

export { definitions };
