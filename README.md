# ☕ dApp on near protocol to support people by minting them NFTs and donating

## Features
- Server side rendering with Nextjs
- UI/UX with Chakra UI
- AI image editing with [deepAI](https://deepai.org/machine-learning-model/image-editor)
- NFT minting with [Mintbase SDKs](https://docs.mintbase.xyz/dev/mintbase-sdk-ref)
- Proxy mint contract that pays for minting
- Sync with [Social Near](https://near.social/) profile data from socialDB smart contract

## Instructions
0) Copy .env.local.example into .env.local to set your own environment variables
1) Create near user
  Create an account in near to be the owner of the contracts. Save account addres on .env.local file.
2) Create mintbase nft contract
    - Go to [mintbase website](https://www.mintbase.xyz/)
    - Connect with a wallet
    - Create a new nft contract assigning a near account address as the owner of the mintbase nft contract.
3) Create a proxy minter contract

   Create a new near account. You can create a subaccount using the previous owner account with:
    - Install near cli (optional)
      
      `npm install --global near-cli`
    - Login with owner account

      `near login`
    - Create subaccount

      `near create-account PROXY-SUBACCOUNT-NAME.YOUR-ACCOUNT-NAME.testnet --masterAccount YOUR-ACCOUNT-NAME.testnet`
    - Build and deploy this [proxy contract](https://github.com/daviloops/mintmeacoffee-proxy)

      `near deploy --accountId PROXY-SUBACCOUNT-NAME.YOUR-ACCOUNT-NAME.testnet --wasmFile PATH_TO_WASM_FILE`
    - Set proxy contract at `.env.local` file
5) Get an api key from deepAI (or use default, but please moderate)
    - Sign up at [deepAI](https://deepai.org)
    - Go to your [deepAI profile](https://deepai.org/dashboard/profile), copy your api key and set it at `.env.local` file
6) Install dependencies with `npm i`
7) Interact with nextjs project using the following instructions or just run `npm run dev`:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
