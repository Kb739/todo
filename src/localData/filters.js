import { nanoid } from "nanoid";

const allFilters = [
    {
        id: nanoid(),
        label: "Today",
        fn: (task) => {
            //before end of the day
            return true
        }
    },
    {
        id: nanoid(),
        label: "This Week",
        fn: (task) => {
            //before end of this week
            return true
        }
    }
]
export default allFilters