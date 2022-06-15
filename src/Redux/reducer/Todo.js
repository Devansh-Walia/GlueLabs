const save = (tempState) => {
    localStorage.setItem("todos", JSON.stringify(tempState));
}

const initialState = {
    left: 0,
    todos: JSON.parse(localStorage.getItem("todos")) || []
};

const TodoReducer = (state = initialState, action) => {
    const { payLoad, type } = action;
    let tempState = state;
    switch (type) {
        case "SET_TODOS":
            console.log("in set");
            return state;
        case "ADD":
            tempState = [...state, {
                key: new Date().getTime(),
                todo: payLoad.todo,
                completed: false,
            }];
            save(tempState);
            return tempState;
        case "DELETE":
            tempState = tempState.filter((t) => t.key !== payLoad.todo.key)
            save(tempState);
            return tempState;
        case "UPDATE":
            tempState.forEach((t) => {
                if (t.key === payLoad.todo.key) {
                    t.todo = payLoad.value;
                    t.completed = false;
                }
            })
            save(tempState);
            return tempState;
        case "TOGGLE":
            tempState.forEach((t) => {
                if (t.key === payLoad.todo.key) {
                    t.completed = !t.completed;
                }
            })
            save(tempState);
            return tempState;
        case "TOGGLE_ALL":
            let wereAllTodosCompleted = true;
            tempState.forEach((t) => {
                if (t.completed === false) {
                    wereAllTodosCompleted = false;
                    t.completed = true;
                }
            });
            if (wereAllTodosCompleted) {
                tempState.forEach((t) => {
                    t.completed = false;
                });
            }
            save(tempState);
            return tempState;
        case "CLEAR_COMPLETED":
            tempState = tempState.filter((t) => !t.completed);
            save(tempState);
            return tempState;
        default:
            return state;
    }
};
export default TodoReducer;