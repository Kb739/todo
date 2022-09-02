
const defaultTask = {
    title: '',
    description: '',
    parentList: '',
    forToday: false,
    isImportant: false,
}

const allFilters = {
    "Important": {
        filterMethod: task => task.isImportant,
        factoryTask: {
            ...defaultTask,
            isImportant: true
        }
    },
    "My Day": {
        filterMethod: task => task.onMyDay,
        factoryTask: {
            ...defaultTask,
            forToday: true
        }
    },
    default: (Title) => {
        return {
            filterMethod: task => task.title === Title,
            factoryTask: {
                ...defaultTask,
                parentList: Title
            }
        }
    }
}

export default allFilters