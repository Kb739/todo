import { nanoid } from "nanoid"
const allTasks = [
    {
        id: nanoid(),
        title: "milk",
        description: "long ass description",
        category: "groceries",
    },
    {
        id: nanoid(),
        title: "visit dentist",
        description: "",
        category: "with friend",
    },
    {
        id: nanoid(),
        title: "teach basics of js",
        description: "don't spend too long",
        category: "with friend",
    }
]
const allLists = [
    {
        id: nanoid(),
        title: "groceries",
    },
    {
        id: nanoid(),
        title: "with friend",
    }
]
export { allTasks, allLists }