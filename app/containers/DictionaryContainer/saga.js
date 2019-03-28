import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { validSearch, invalidSearch } from './actions';
import { SEARCH_BUTTON_CLICKED_ACTION } from './constants';

export function* searchDictionary({ values }) {
  const { query } = values.toJS();
  const searchQuery = query.replace(' ', '+');

  try {
    const response = yield call(
      request,
      `https://api.datamuse.com/words?mode=no-cors&ml=${searchQuery}`,
      {
        method: 'GET',
      },
    );
    yield put(validSearch(response));
  } catch (error) {
    console.log(error);
    yield put(invalidSearch(error));
  }
}

export default function* waitForLoginInfo() {
  yield takeLatest(SEARCH_BUTTON_CLICKED_ACTION, searchDictionary);
}
