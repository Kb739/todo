const allTasks = [
    {
        id: new Date(),
        title: "milk",
        description: "long ass description",
        category: "groceries",
        selected: false
    },
    {
        id: new Date(),
        title: "visit dentist",
        description: "",
        category: "with friend",
        selected: false
    },
    {
        id: new Date(),
        title: "teach basics of js",
        description: "don't spend too long",
        category: "with friend",
        selected: false
    }
]
const allCategories = [
    {
        id: new Date(),
        title: "groceries",
        selected: true
    },
    {
        id: new Date(),
        title: "with friend",
        selected: false
    }
]
export { allTasks, allCategories }