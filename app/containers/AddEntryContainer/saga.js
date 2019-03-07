import { put, all, takeLatest } from 'redux-saga/effects';
import { authenticated } from 'utils/apiRequestSaga';
import { loadWordList } from 'containers/WordListContainer/actions';
import { ENTRY_ADDED } from './constants';

export function* setEntry({ values }) {
  console.log(values.toJS());
  const { entry } = values.toJS();
  yield authenticated(
    'entries',
    {
      method: 'POST',
      body: JSON.stringify({ entry }),
    },
    function* onSuccess() {
      yield put(loadWordList());
    },
    function* onError(error) {
      console.log(error);
    },
  );
}

// Individual exports for testing
export default function* wordlistContainerSaga() {
  yield all([takeLatest(ENTRY_ADDED, setEntry)]);
}
