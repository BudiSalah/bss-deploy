// let url = "https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/users"

// export async function users() {
//     const promise = await fetch(url)
//     const response = await promise.json()
//     return response
// }

export const staticUsers = [
    {
        id: 1,
        name: "Budi",
        played: "20",
        win: "20",
        draw: "0",
        lose: "0",
        gf: "100",
        ga: "10",
        points: "60",
        lastFive: ["lose", "lose", "win", "win", "draw"]
    },
    {
        id: 2,
        name: "Sharkawy",
        played: "20",
        win: "11",
        draw: "4",
        lose: "5",
        gf: "60",
        ga: "15",
        points: "33",
        lastFive: ["draw", "lose", "win", "lose", "win"]
    },
    {
        id: 3,
        name: "Samir",
        played: "20",
        win: "9",
        draw: "8",
        lose: "3",
        gf: "55",
        ga: "17",
        points: "63",
        lastFive: ["lose", "draw", "lose", "win", "win"]
    },
    // {
    //     id: 4,
    //     name: "Alex",
    //     played: "20",
    //     win: "3",
    //     draw: "1",
    //     lose: "1",
    //     gf: "13",
    //     ga: "15",
    //     points: "21",
    //     lastFive: ["draw", "draw", "lose", "win", "win"]
    // },
]