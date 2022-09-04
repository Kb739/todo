
const defaultTask = {
    title: '',
    description: '',
    parentList: '',
    isImportant: false,
    finished: false,
    dueTime: ''
}

const allFilters = {
    custom: {
        "Important": {
            filterMethod: task => task.isImportant && !task.finished,
            factoryTask: {
                ...defaultTask,
                isImportant: true
            }
        }
    },
    default: (parentId) => {
        return {
            filterMethod: task => task.parentList === parentId,
            factoryTask: {
                ...defaultTask,
                parentList: parentId
            }
        }
    }
}

export default allFilters