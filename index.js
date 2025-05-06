const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let lobby = {
  code: Math.random().toString(36).substr(2, 6).toUpperCase(),
  name: "Default Lobby",
  password: "",
  isOpen: true,
  players: [],
};

app.get('/lobby', (req, res) => {
  res.json({
    code: lobby.code,
    name: lobby.name,
    hasPassword: !!lobby.password,
    isOpen: lobby.isOpen,
    playerCount: lobby.players.length
  });
});

app.post('/create', (req, res) => {
  const { name, password } = req.body;
  lobby.name = name || "My Lobby";
  lobby.password = password || "";
  lobby.isOpen = true;
  lobby.players = [];
  lobby.code = Math.random().toString(36).substr(2, 6).toUpperCase();

  res.json({ message: 'Lobby created', code: lobby.code });
});

app.post('/join', (req, res) => {
  const { password } = req.body;

  if (lobby.password && lobby.password !== password) {
    return res.status(403).json({ error: 'Wrong password' });
  }

  lobby.players.push({ joinedAt: Date.now() });
  res.json({ message: 'Joined successfully' });
});

app.listen(3000, () => {
  console.log('Lobby server running on http://localhost:3000');
});