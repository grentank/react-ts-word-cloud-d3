import type { AnswerType } from '../../types/wordTypes';
import type {
  WsCloseType,
  WsConnectType,
  WsInitType,
  WsMessageSendType,
  WsMessageSetType,
  WsSendAnswer,
  WsSendCurrentQuestion,
} from '../../types/wsTypes';
import {
  SOCKET_SEND_CURRENT_QUESTION,
  SOCKET_SEND_ANSWER,
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

export const wsMessageSendAction = (payload: AnswerType): WsMessageSendType => ({
  type: SOCKET_MESSAGE_SEND,
  payload,
});

export const wsSendAnswer = (payload: AnswerType): WsSendAnswer => ({
  type: SOCKET_SEND_ANSWER,
  payload,
});

export const wsSendCurrentQuestion = (payload: number): WsSendCurrentQuestion => ({
  type: SOCKET_SEND_CURRENT_QUESTION,
  payload,
});
