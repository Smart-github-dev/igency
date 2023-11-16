let data = {
    images: [],
    map: [],
    players: [],
    bullets: [],
    buildings: [],
    loot: [],
    plants: [],
    rules: {},
    $: function (newData) {
        data = newData
    }
}

export { data }