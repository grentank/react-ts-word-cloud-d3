import {
  SOCKET_SEND_ANSWER,
  WsCloseType,
  WsConnectType,
  WsInitType,
  WsMessageSendType,
  WsMessageSetType,
  WsSendAnswer,
} from '../../types/wsTypes';
import {
  SOCKET_CONNECT,
  SOCKET_MESSAGE_SEND,
  SOCKET_MESSAGE_SET,
  SOCKET_CLOSE,
  SOCKET_INIT,
} from '../../types/wsTypes';

export const wsInitAction = (): WsInitType => ({
  type: SOCKET_INIT,
});

export const wsConnectAction = (): WsConnectType => ({
  type: SOCKET_CONNECT,
});

export const wsCloseAction = (): WsCloseType => ({
  type: SOCKET_CLOSE,
});

export const wsMessageSetAction = (payload: string): WsMessageSetType => ({
  type: SOCKET_MESSAGE_SET,
  payload,
});

export const wsMessageSendAction = (payload: string): WsMessageSendType => ({
  type: SOCKET_MESSAGE_SEND,
  payload,
});

export const wsSendAnswer = (payload: string): WsSendAnswer => ({
  type: SOCKET_SEND_ANSWER,
  payload,
});
