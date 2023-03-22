const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const store = require('session-file-store');
const http = require('http');
const { WebSocketServer } = require('ws');
const authRouter = require('./routes/authRouter');
require('dotenv').config();

const FileStore = store(session);
const PORT = 3001;

const map = new Map();

const sessionConfig = session({
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'wordcloud',
  resave: true,
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
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(sessionConfig);
app.use(express.static('public'));

// app.use('/api/posts', postRouter);
app.use('/api/auth', authRouter);
// app.use('/api/word', wordRouter);

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
    // socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    // socket.destroy();
    // return;
    // }

    console.log('Session is parsed!');

    socket.removeListener('error', onSocketError);

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });
});

wss.on('connection', (ws, request) => {
  const { id } = request.session.user;

  map.set(id, ws);

  ws.on('error', console.error);

  ws.on('message', (message) => {
    //
    // Here we can now use session parameters.
    //
    console.log(`Received message ${message} from user ${id}`);
  });

  ws.on('close', () => {
    map.delete(id);
  });
});

server.listen(PORT, () => {
  console.log('server start on Port', PORT);
});
