const { Client, LocalAuth  } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new client instance
const client = new Client({
    authStrategy: new LocalAuth()
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
    uploadGroups(client);
});

// When the client received QR-Code
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

const uploadGroups = async (client) => {
    const allChats = await client.getChats();
    const groups = allChats.filter((chat) => chat.isGroup === true);
    groups.map(async (group) => {
        console.log(group.groupMetadata.participants);
    });
   };
  

// Start your client
client.initialize();