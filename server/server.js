const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const store = require('session-file-store');
const http = require('http');
const { WebSocketServer } = require('ws');
require('dotenv').config();
const authRouter = require('./routes/authRouter');

const FileStore = store(session);
const PORT = process.env.PORT || 3001;

const map = new Map();
map.set('hosts', []);
map.set('guests', []);

const sessionConfig = session({
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'wordcloud',
  resave: false,
  store: new FileStore(),
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(sessionConfig);
app.use(express.static('public'));

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

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', (ws, request) => {
  const { user } = request.session;

  if (user.host) map.get('hosts').push({ ws, user });
  else map.set(user.id, { ws, user });

  ws.on('error', console.error);

  ws.on('message', async (message) => {
    const { type, payload } = JSON.parse(message);

    // const currentAnswers = request.session.user.answers;

    // request.session.user = {
    //   ...request.session.user,
    //   answers: [...currentAnswers, payload],
    // };

    request.session.user.answers.push(payload);
    request.session.save((err) => {
      if (err) {
        console.error('Failed to save session:', err);
      } else {
        console.log('Session saved successfully');
      }
    });

    map.get('hosts').forEach((host) => {
      host.ws.send(
        JSON.stringify({
          type: 'words/addWordToDisplayedWords',
          payload,
        }),
      );
    });
  });

  ws.on('close', () => {
    map.delete(user.id);
  });
});

server.listen(PORT, () => {
  console.log('server start on Port', PORT);
});
