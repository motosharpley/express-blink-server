// @ts-check
import express from 'express';
// import { createTransfer } from '@solana/pay';
import {
  PublicKey,
  Connection,
  Keypair,
  VersionedTransaction,
  TransactionMessage,
} from '@solana/web3.js';
// import BigNumber from 'bignumber.js';
import {
  getAssociatedTokenAddress,
  getAccount,
  getMint,
  createTransferCheckedInstruction,
} from '@solana/spl-token';

//Initialize the app
const app = express();
const connection = new Connection(
  'https://soft-weathered-valley.solana-devnet.quiknode.pro/968177985cf58861c3fd978967b5c529d7b05cb7/',
  'confirmed'
);
//Use JSON middleware to parse JSON request bodies
app.use(express.json());

//Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.status(200).send('Hello, Blink Server!');
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
  const transaction = new VersionedTransaction(
    new TransactionMessage({
      payerKey: sender,
      recentBlockhash: blockhash.blockhash,
      // add the instruction to the transaction
      instructions: [splTransferIx],
    }).compileToV0Message()
  );

  const serializedTransaction = transaction.serialize();

  const base64Transaction = Buffer.from(serializedTransaction).toString(
    'base64'
  );
  const message = 'Thank you for your purchase!';

  res.status(200).json({
    transaction: base64Transaction,
    message: message,
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

app.get('/actions/vote', (req, res) => {
  const title = 'Hello Solana Actions!';
  const icon = '🌍';
  res.status(200).json({
    title: 'GigL Meme Contest',
    icon: '<url-to-image>',
    description: 'Vote on the top meme of the week!',
    label: 'Vote',
    links: {
      actions: [
        {
          label: 'Vote MEME1', // button text
          href: '/actions/memes/vote?choice=meme1',
        },
        {
          label: 'Vote MEME2', // button text
          href: '/actions/memes/vote?choice=meme2',
        },
      ],
    },
  });
});

// Define a Solana Actions POST endpoint
app.post('/actions/vote', async (req, res) => {
  // Account provided in the transaction request body by the wallet.
  const accountField = req.body.account;
  if (!accountField) throw new Error('missing account');
  const sender = new PublicKey(accountField);

  // TODO Build a transaction object

  // TODO base64 encoded transaction
  const base64TX = req.body;
  res.status(200).json({
    transaction: base64TX,
    message: 'Hello, Vote POST request!',
  });
});
