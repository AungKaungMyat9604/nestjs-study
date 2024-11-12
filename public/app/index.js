import { io } from 'https://cdn.socket.io/4.8.0/socket.io.esm.min.js';

const bedRequestButton = document.getElementById('bed-request-button');
const bedNoInput = document.getElementById('bed-no');

const bedSocket = io('http://localhost:3000/beds', {
  transports: ['websocket'],
});

bedSocket.on('connect', () => {
  console.log(bedSocket.id);

  bedSocket.on(`bed-no-accepted ${bedSocket.id}`, (bedNo) => {
    console.log(`Accepted ${bedNo}`);
    alert(`Accepted ${bedNo}`);
  });
});

bedRequestButton.onclick = () => {
  if (bedSocket.connected) {
    const bedNo = bedNoInput.value;
    bedSocket.emit('request-bed', bedNo);
  } else {
    console.log('not connected');
  }
};

const wardRequestButton = document.getElementById('ward-request-button');
const wardNameInput = document.getElementById('ward-name');

const wardSocket = io('http://localhost:3000/wards', {
  transports: ['websocket'],
});

wardSocket.on('connect', () => {
  console.log(wardSocket.id);

  wardSocket.on(`ward-name-accepted ${wardSocket.id}`, (wardName) => {
    console.log(`Accepted ${wardName}`);
    alert(`Accepted ${wardName}`);
  });
});

wardRequestButton.onclick = () => {
  if (wardSocket.connected) {
    const wardName = wardNameInput.value;
    wardSocket.emit('request-ward', wardName);
  } else {
    console.log('not connected');
  }
};
