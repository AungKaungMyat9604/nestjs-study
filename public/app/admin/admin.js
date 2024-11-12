import { io } from 'https://cdn.socket.io/4.8.0/socket.io.esm.min.js';

const checkConnectionButton = document.getElementById('check-connection');

const adminBedSocket = io('http://localhost:3000/beds-admin', {
  transports: ['websocket'],
  query: { token: '123' },
});

adminBedSocket.on('connect', () => {
  console.log(adminBedSocket.id);
});

adminBedSocket.on('disconnect', () => {
  console.log('Scoket is disconnected');
});

adminBedSocket.on('incoming-bed-request', ({ clientId, bedNo }) => {
  const ask = confirm(
    `Do you want to accept ${bedNo} requested by ${clientId}`,
  );

  if (ask) {
    adminBedSocket.emit('accept-bed-no', { clientId, bedNo });
  }
});

checkConnectionButton.onclick = (e) => {
  console.log('Socket is connected or not: ', adminBedSocket.connected);
};

const adminWardSocket = io('http://localhost:3000/wards-admin', {
  transports: ['websocket'],
  query: { token: '123' },
});

adminWardSocket.on('connect', () => {
  console.log(adminWardSocket.id);
});

adminWardSocket.on('disconnect', () => {
  console.log('Scoket is disconnected');
});

adminWardSocket.on('incoming-ward-request', ({ clientId, wardName }) => {
  const ask = confirm(
    `Do you want to accept ${wardName} requested by ${clientId}`,
  );

  if (ask) {
    adminWardSocket.emit('accept-ward-name', { clientId, wardName });
  }
});
