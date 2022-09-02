
const defaultTask = {
    title: '',
    description: '',
    parentList: '',
    forToday: false,
    isImportant: false,
}

const allFilters = {
    custom: {
        "Important": {
            filterMethod: task => task.isImportant,
            factoryTask: {
                ...defaultTask,
                isImportant: true
            }
        }
    },
    default: (Title) => {
        return {
            filterMethod: task => task.parentList === Title,
            factoryTask: {
                ...defaultTask,
                parentList: Title
            }
        }
    }
}

export default allFilters