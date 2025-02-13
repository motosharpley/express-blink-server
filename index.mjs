// @ts-check
import express from 'express';
// import { createTransfer } from '@solana/pay';
import {
  PublicKey,
  Connection,
  Keypair,
  VersionedTransaction,
  TransactionMessage,
  Transaction,
} from '@solana/web3.js';
// import BigNumber from 'bignumber.js';
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
  createTransferCheckedInstruction,
} from '@solana/spl-token';
// import { ACTIONS_CORS_HEADERS } from '@solana/actions';
import cors from 'cors';

//Initialize the app
const app = express();
const connection = new Connection(
  'https://soft-weathered-valley.solana-devnet.quiknode.pro/968177985cf58861c3fd978967b5c529d7b05cb7/',
  'confirmed'
);
//Use JSON middleware to parse JSON request bodies
app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Content-Encoding',
      'Accept-Encoding',
    ],
  })
);

//Start the server
const PORT = 0;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// enable CORS for all routes
app.options('*', cors());

// // Define a Solana Actions OPTIONS endpoint
// app.options('/actions/*', (req, res) => {
//   res.sendStatus(200);
// });

app.get('/', (req, res) => {
  res.send('Hello, Blink Server!');
});

//Define a Solana Pay Transaction Request GET endpoint
app.get('/pay', (req, res) => {
  const label = 'CashBTN!';
  const icon = '🌍';
  res.status(200).json({
    label,
    icon,
  });
});

//Define a Solana Pay Transaction Request POST endpoint
app.post('/pay', async (req, res) => {
  // Account provided in the transaction req.body by the wallet.
  const accountField = req.body?.account;
  if (!accountField) throw new Error('missing account');
  if (typeof accountField !== 'string') throw new Error('invalid account');
  const sender = new PublicKey(accountField);

  const splToken = new PublicKey(
    'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'
  );
  const MERCHANT_WALLET = new PublicKey(
    '5CfEty3pffxuWVhRg9VaJjdZ9TBfgHxgPMceEhuikuap'
  );

  async function createSplTransferIx(sender, connection) {
    // Get the sender's ATA and check that the account exists and can send tokens
    const senderATA = await getAssociatedTokenAddress(splToken, sender);
    const senderAccount = await getAccount(connection, senderATA);
    if (!senderAccount.isInitialized) throw new Error('sender not initialized');
    if (senderAccount.isFrozen) throw new Error('sender frozen');
    // console.log('senderAccount', senderAccount);

    const merchantATA = new PublicKey(
      '6Y9VSMaRYoRLsWeRJiibddfR6CGhnkYvRPnUa2LqTUAS'
    );
    // Check that the token provided is an initialized mint
    const mint = await getMint(connection, splToken);
    if (!mint.isInitialized) throw new Error('mint not initialized');

    let amount = 10000000;
    // Check that the sender has enough tokens
    const tokens = BigInt(String(amount));
    if (tokens > senderAccount.amount) throw new Error('insufficient funds');

    // Create an instruction to transfer SPL tokens, asserting the mint and decimals match
    const splTransferIx = createTransferCheckedInstruction(
      senderATA,
      splToken,
      merchantATA,
      sender,
      tokens,
      mint.decimals
    );

    // Create a reference that is unique to each checkout session
    const references = [new Keypair().publicKey];

    // add references to the instruction
    for (const pubkey of references) {
      splTransferIx.keys.push({ pubkey, isWritable: false, isSigner: false });
    }

    return splTransferIx;
  }

  // create spl transfer instruction
  const splTransferIx = await createSplTransferIx(sender, connection);
  const blockhash = await connection.getLatestBlockhash();
  // console.log('splTransferIx', splTransferIx);

  // create the transaction
  const transactionV0 = new VersionedTransaction(
    new TransactionMessage({
      payerKey: sender,
      recentBlockhash: blockhash.blockhash,
      // add the instruction to the transaction
      instructions: [splTransferIx],
    }).compileToLegacyMessage()
  );

  const serializedTransaction = transactionV0.serialize();

  const base64Transaction = Buffer.from(serializedTransaction).toString(
    'base64'
  );
  const message = 'Thank you for your purchase!';

  res.json({
    transaction: base64Transaction,
    message: message,
  });
});

// Define a route to serve actions.json rules
app.get('/actions.json', (req, res) => {
  res.json({
    rules: [
      { pathPattern: '/*', apiPath: '/actions/*' },
      { pathPattern: '/actions/**', apiPath: '/actions/**' },
    ],
  });
});

/*
// Define a Solana Actions GET endpoint
export interface ActionGetResponse {
  // image url that represents the source of the action request
  icon: string;
  // describes the source of the action request
  title: string;
  // brief summary of the action to be performed
  description: string;
  // button text rendered to the user
  label: string;
  // UI state for the button being rendered to the user
  disabled?: boolean;
  links?: {
    // list of related Actions a user could perform
    actions: LinkedAction[],
  };
  // non-fatal error message to be displayed to the user
  error?: ActionError;
}
*/

app.get('/actions/donate', (req, res) => {
  res.json({
    title: 'GigL Meme Contest',
    icon: 'https://cashbtn.com/assets/light-purple-cube.png',
    description: 'Donate 10 USDC!',
    label: 'Donate USDC',
    links: {
      actions: [
        {
          label: 'Send 10 USDC', // button text
          href: '/actions/donate', // action endpoint
        },
      ],
    },
  });
});

// Define a Solana Actions POST endpoint
app.post('/actions/donate', async (req, res) => {
  // Account provided in the transaction req.body by the wallet.
  const accountField = req.body?.account;
  if (!accountField) throw new Error('missing account');
  if (typeof accountField !== 'string') throw new Error('invalid account');
  const sender = new PublicKey(accountField);

  const splToken = new PublicKey(
    'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'
  );
  const MERCHANT_WALLET = new PublicKey(
    '5CfEty3pffxuWVhRg9VaJjdZ9TBfgHxgPMceEhuikuap'
  );

  async function createSplTransferIx(sender, connection) {
    // Get the sender's ATA and check that the account exists and can send tokens
    const senderATA = await getAssociatedTokenAddress(splToken, sender);
    const senderAccount = await getAccount(connection, senderATA);
    if (!senderAccount.isInitialized) throw new Error('sender not initialized');
    if (senderAccount.isFrozen) throw new Error('sender frozen');

    const merchantATA = new PublicKey(
      '6Y9VSMaRYoRLsWeRJiibddfR6CGhnkYvRPnUa2LqTUAS'
    );
    // Check that the token provided is an initialized mint
    const mint = await getMint(connection, splToken);
    if (!mint.isInitialized) throw new Error('mint not initialized');

    let amount = 10000000;
    // Check that the sender has enough tokens
    const tokens = BigInt(String(amount));
    if (tokens > senderAccount.amount) throw new Error('insufficient funds');

    // Create an instruction to transfer SPL tokens, asserting the mint and decimals match
    const splTransferIx = createTransferCheckedInstruction(
      senderATA,
      splToken,
      merchantATA,
      sender,
      tokens,
      mint.decimals
    );

    // Create a reference that is unique to each checkout session
    const references = [new Keypair().publicKey];

    // add references to the instruction
    for (const pubkey of references) {
      splTransferIx.keys.push({ pubkey, isWritable: false, isSigner: false });
    }

    return splTransferIx;
  }

  // create spl transfer instruction
  const splTransferIx = await createSplTransferIx(sender, connection);
  const blockhash = await connection.getLatestBlockhash();

  // create the transaction
  const transactionV0 = new VersionedTransaction(
    new TransactionMessage({
      payerKey: sender,
      recentBlockhash: blockhash.blockhash,
      instructions: [splTransferIx],
    }).compileToLegacyMessage()
  );

  const serializedTransaction = transactionV0.serialize();
  const base64Transaction = Buffer.from(serializedTransaction).toString(
    'base64'
  );
  const message = 'Thank you for your donation!';

  res.json({
    transaction: base64Transaction,
    message: message,
  });
});
