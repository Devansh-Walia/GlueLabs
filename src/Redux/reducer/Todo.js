
const initialState = {
    left: JSON.parse(localStorage.getItem("left")) || 0,
    todos: JSON.parse(localStorage.getItem("todos")) || []
};

const save = (tempState) => {
    initialState.left = tempState.filter((t)=>!t.completed).length
    localStorage.setItem("todos", JSON.stringify(tempState));
    localStorage.setItem("left", initialState.left)
}

const TodoReducer = (state = initialState, action) => {
    const { payLoad, type } = action;
    let tempState = state.todos;
    switch (type) {
        case "SET_TODOS":
            console.log("in set");
            return state;

        case "ADD":
            tempState = [...state.todos, {
                key: new Date().getTime(),
                todo: payLoad.todo,
                completed: false,
            }];
            save(tempState);
            return {
                    todos:tempState,
                    left:initialState.left
                };

        case "DELETE":
            tempState = tempState.filter((t) => t.key !== payLoad.todo.key)
            save(tempState);
            return {
                    todos:tempState,
                    left:initialState.left
                };

        case "UPDATE":
            tempState.forEach((t) => {
                if (t.key === payLoad.todo.key) {
                    t.todo = payLoad.value;
                    t.completed = false;
                }
            })
            save(tempState);
            return {
                    todos:tempState,
                    left:initialState.left
                };

        case "TOGGLE":
            tempState.forEach((t) => {
                if (t.key === payLoad.todo.key) {
                    t.completed = !t.completed;
                }
            })
            save(tempState);
            return {
                    todos:tempState,
                    left:initialState.left
                };

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
            return {
                    todos:tempState,
                    left:initialState.left
                };

        case "CLEAR_COMPLETED":
            tempState = tempState.filter((t) => !t.completed);
            save(tempState);
            return {
                    todos:tempState,
                    left:initialState.left
                };
                
        default:
            return state;
    }
};
export default TodoReducer;