import type { EventChannel } from 'redux-saga';
import { END, eventChannel } from 'redux-saga';
import type { ActionPattern } from 'redux-saga/effects';
import { takeEvery, call, put, take } from 'redux-saga/effects';
import type { WsActionTypes } from '../../types/wsTypes';
import { SOCKET_CLOSE, SOCKET_INIT, SOCKET_CONNECT } from '../../types/wsTypes';
import { wsCloseAction, wsConnectAction, wsInitAction } from '../actions/wsActions';

function createSocketChannel(socket: WebSocket): EventChannel<WsActionTypes> {
  return eventChannel((emit) => {
    socket.onopen = (event) => {
      //   console.log(event);
      emit(wsConnectAction());
    };

    socket.onerror = (error) => {
      emit(wsCloseAction());
    };

    socket.onmessage = ({ data }: MessageEvent<string>) => {
      const dataFromBack = JSON.parse(data) as WsActionTypes;
      emit(dataFromBack);
    };

    socket.onclose = (event) => {
      emit(wsCloseAction());
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function* wsWorker(): Generator<unknown, void, WsActionTypes> {
  const socket = new WebSocket('ws://localhost:3001');
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      const backAction = yield take(socketChannel as unknown as ActionPattern<WsActionTypes>);
      put(backAction);

      //   switch (backAction.type) {
      //     case SOCKET_CONNECT:
      //       yield put(setOnline(true));
      //       break;
      //     case SOCKET_CLOSE:
      //       yield put(setOnline(false));
      //       break;
      //     default:
      //       break;
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* wsWatcher(): Generator {
  yield takeEvery(SOCKET_INIT, wsWorker);
}
