import { delay } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
// can also use takeLatest to only take the last action to perform the action


function* addTodoAsync() {
    yield delay(4000);
    yield put({type: 'ADD_TODO', value:1})
}

export function* addWatcher() {
    yield takeEvery('ADD', addTodoAsync);
}