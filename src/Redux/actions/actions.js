export const addTodoRedux = (todo) => {
    return {
        type: "ADD",
        payLoad: { todo, }
    };
};

export const deleteTodoRedux = (todo) => {
    return {
        type: "DELETE",
        payLoad: { todo },
    };
};

export const updateTodoRedux = (todo, value) => {
    return {
        type: "UPDATE",
        payLoad: {
            todo,
            value,
        }
    }
}

export const toggleTodoRedux = (todo) => {
    return {
        type: "TOGGLE",
        payLoad: { todo }
    }
}
export const toggleAllRedux = () => {
    return {
        type: "TOGGLE_ALL"
    }
}
export const clearCompletedRedux= () => {
    return {
        type: "CLEAR_COMPLETED"
    }
}