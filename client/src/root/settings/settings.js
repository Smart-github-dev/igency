let settings = {
  version: "1.0.0",
  window: {
    width: null,
    height: null,
  },
  id: null,
  roles: [],
  package: "default",
  quality: 2,
  developer: {
    hitboxes: {
      enabled: true,
      color: "red",
      size: 2,
    },
  },
  root: {
    server: {
      address: "ws://localhost:2023",
    },
  },
  game: {
    keybinds: {
      up: "w",
      down: "s",
      left: "a",
      right: "d",
      slots: {
        one: "e",
        two: "r",
        three: "f",
        four: "g",
        five: "t",
        six: "h",
      },
    },
    ui: {
      joysticks: {
        base: {
          size: 150,
        },
        stick: {
          size: 75,
        },
        sensitivity: 40,
      },
      healthbar: {
        base: {
          width: 3,
          height: 25,
          x: window.innerWidth / 2 - 3 * 50,
          y: (window.innerHeight / 2) * 2 - 50,
        },
        detail: {
          width: 3,
          height: 25,
          x: window.innerWidth / 2 - 3 * 50,
          y: (window.innerHeight / 2) * 2 - 50,
        },
      },
      slots: {
        one: {
          width: 100,
          height: 50,
          x: window.innerWidth - 150,
          y: window.innerHeight / 2 + 150,
        },
        two: {
          width: 100,
          height: 50,
          x: window.innerWidth - 150,
          y: window.innerHeight / 2 + 75,
        },
        three: {
          width: 100,
          height: 50,
          x: window.innerWidth - 150,
          y: window.innerHeight / 2,
        },
        four: {
          width: 100,
          height: 50,
          x: window.innerWidth - 150,
          y: window.innerHeight / 2 - 75,
        },
        five: {
          width: 100,
          height: 50,
          x: window.innerWidth - 150,
          y: window.innerHeight / 2 - 150,
        },
        six: {
          width: 100,
          height: 50,
          x: window.innerWidth - 150,
          y: window.innerHeight / 2 - 225,
        },
      },
    },
    player: {
      username: "Developer",
      skin: {
        body: "default_body",
        hands: {
          left: "default_hand_left",
          right: "default_hand_right",
        },
      },
    },
  },
  $: function (data) {
    settings = data;
  },
};

export { settings };
