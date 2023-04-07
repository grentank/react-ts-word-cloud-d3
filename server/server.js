const express = require('express');
const cors = require('cors');
const session = require('express-session');
const store = require('session-file-store');
const path = require('path');
const http = require('http');
const { WebSocketServer } = require('ws');
require('dotenv').config();
const authRouter = require('./routes/authRouter');

const FileStore = store(session);
const PORT = process.env.PORT || 3001;

const map = new Map();
map.set('config', {
  hosts: [],
  guests: [],
  state: { currentQuestion: 0 },
});
// map.set('hosts', []);
// map.set('guests', []);
// map.set('state', { currentQuestion: 0 });

const sessionConfig = session({
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'wordcloud',
  resave: false,
  store: new FileStore(),
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30,
    httpOnly: true,
  },
});

const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(sessionConfig);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.use((req, res, next) => {
  res.locals.currentQuestion = map.get('config').state.currentQuestion;
  next();
});

app.use('/api/auth', authRouter);

const server = http.createServer(app);
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

function onSocketError(err) {
  console.error(err);
}

server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

  socket.on('error', onSocketError);

  sessionConfig(request, {}, () => {
    // if (!request.session.user) {
    //   request.session.user = {
    //     // Если не авторизован, ставим guest true и id присваиваем из сессии
    //     guest: true,
    //     id: request.session.id,
    //   };
    // }

    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');

    socket.removeListener('error', onSocketError);

    if (request.session.user.currentQuestion !== map.get('config').state.currentQuestion) {
      request.session.user.currentQuestion = map.get('config').state.currentQuestion;
      console.log(request.session.user);
      request.session.save((err) => {
        if (err) console.log('error saving session', err);
        else {
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
          });
        }
      });
    } else {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });
});

wss.on('connection', (ws, request) => {
  const { user } = request.session;

  if (user.host) map.get('config').hosts.push({ ws, user });
  else map.get('config').guests.push({ ws, user });
  map.set(user.id, { ws, user });

  ws.on('error', console.error);

  ws.on('message', async (message) => {
    const parsed = JSON.parse(message);
    const { type, payload } = parsed;
    console.log(parsed);

    switch (type) {
      case 'SOCKET_SEND_ANSWER': {
        request.session.user.answers.push(payload);
        request.session.save((err) => {
          if (err) {
            console.error('Failed to save session:', err);
          } else {
            console.log('Session saved successfully', request.session.user.id);
          }
        });

        map.get('config').hosts.forEach((host) => {
          host.ws.send(
            JSON.stringify({
              type: 'words/addWordFromBackend',
              payload,
            }),
          );
        });
        break;
      }
      case 'SOCKET_SEND_CURRENT_QUESTION': {
        map.get('config').state.currentQuestion = payload;
        console.log('map config', map.get('config'));

        break;
      }

      default:
        break;
    }
    // if (type === 'SOCKET_SEND_ANSWER') {

    // }

    // const currentAnswers = request.session.user.answers;

    // request.session.user = {
    //   ...request.session.user,
    //   answers: [...currentAnswers, payload],
    // };
  });

  ws.on('close', () => {
    map.delete(user.id);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

server.listen(PORT, () => {
  console.log('server start on Port', PORT);
});
