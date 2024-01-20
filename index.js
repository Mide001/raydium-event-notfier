import { Connection, PublicKey } from "@solana/web3.js";
import fetch from "node-fetch";
import {} from "dotenv/config";

const RAYDIUM_PUBLIC_KEY = process.env.RAYDIUM_PUBLIC_KEY;
const quiknodeApiKey = process.env.QUICKNODE_API;

const SESSION_HASH = "QNDEMO" + Math.ceil(Math.random() * 1e9);

let credits = 0;

const raydium = new PublicKey(RAYDIUM_PUBLIC_KEY);

const connection = new Connection(
  `https://solemn-intensive-vineyard.solana-mainnet.quiknode.pro/${quiknodeApiKey}/`,
  {
    wsEndpoint: `wss://solemn-intensive-vineyard.solana-mainnet.quiknode.pro/${quiknodeApiKey}/`,
    httpHeaders: {
      "x-session-hash": SESSION_HASH,
    },
  }
);

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

/* 
async function testTelegramChannelChatId() {
    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
    // Define a static message for testing
    const staticMessage = "This is a test message for the Telegram channel.";
  
    const requestBody = {
      chat_id: TELEGRAM_CHANNEL_ID,
      text: staticMessage,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "post",
        body: JSON.stringify(requestBody),
        headers: { "Content-Type": "application/json" },
      });
  
      const responseData = await response.json();
  
      console.log("Telegram API Response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error sending Telegram message:", error);
      throw error; // You can handle the error here or rethrow it for further handling.
    }
  }
  
  // Call the function to test the Telegram channel chat ID
  testTelegramChannelChatId(); */


async function sendTelegramMessage(message) {
  const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const requestBody = {
    chat_id: TELEGRAM_CHANNEL_ID,
    text: message,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    throw error; // You can handle the error here or rethrow it for further handling.
  }
}

let lastProcessedTxId = null; // Variable to store the last processed transaction ID

// to monitor logs
async function main(connection, programAddress) {
  console.log("Monitoring logs for program: ", programAddress.toString());

  connection.onLogs(
    programAddress,
    async ({ logs, err, signature }) => {
      if (err) return;

      if (logs && logs.some((log) => log.includes("initialize2"))) {
        // Check if this transaction has been processed already
        if (signature !== lastProcessedTxId) {
          lastProcessedTxId = signature;
          await fetchRaydiumAccounts(signature, connection);
        }
      }
    },
    "finalized"
  );
}
// parse transaction and filter data
async function fetchRaydiumAccounts(txId, connection) {
  const tx = await connection.getParsedTransaction(txId, {
    maxSupportedTransactionVersion: 0,
    commitment: "confirmed",
  });

  credits += 100;
  const accounts = tx?.transaction.message.instructions.find(
    (ix) => ix.programId.toBase58() === RAYDIUM_PUBLIC_KEY
  ).accounts;
  if (!accounts) {
    return;
  }

  const tokenAIndex = 8;
  const tokenBIndex = 9;
  const tokenAAccount = accounts[tokenAIndex];
  const tokenBAccount = accounts[tokenBIndex];
  const displayData = [
    {
      Token: "A",
      "Account Public Key": tokenAAccount.toBase58(),
    },
    {
      Token: "B",
      "Account Public Key": tokenBAccount.toBase58(),
    },
  ];
  const message = `
  New LP Found!
  Explorer URL: ${generateExplorerUrl(txId)}
  Total QuickNode Credits Used: ${credits}
  
  Dexscreener Pool: [Dexscreener Pool](https://dexscreener.com/solana/${tokenAAccount.toBase58()})
`;

  await sendTelegramMessage(message);
}

function generateExplorerUrl(txId) {
  return `https://solscan.io/tx/${txId}`;
}

main(connection, raydium).catch(console.error);
