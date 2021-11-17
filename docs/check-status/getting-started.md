---
date: "1"
---
# 👑 Surface History Data - UIs & Front-ends

## 👑 Surface History Data - UIs & Front-ends

UIs and apps will be able to query any Token or NFTs (that uses CAP) transaction history and surface it for its users. This will be done using the **CAP-js library**, that will allow any frontend to communicate with CAP's main canister to query data from any integrated asset.

- Visit [CAP-js repository](https://github.com/Psychedelic/cap-js)
- CAP's Mainnet canister: `lj532-6iaaa-aaaah-qcc7a-cai`

!!! Important

    This is an early version of the documentation! 🚧 for the complete interface you can visit the CAP-js repository above to see more code examples, parameters, and returns for each method. Here we detail the necessary steps based on consuming data for UIs/front-ends.


You can also find to quick code-interactive examples to follow as you read this guide on our GitHub:

- [Basic Example - Using CAP-js](https://github.com/Psychedelic/cap-docs/blob/main/examples/basic/src/index.js)
- [Extended Example- Using CAP-js with Plug](https://github.com/Psychedelic/cap-docs/blob/main/examples/plug/src/index.js)

## Getting Started - CAP-js

Before we can get into any of the fun, we need to download the CAP-js library locally.

### Installing

You'll need to have @Psychedelic Github Package Registry setup to pull and install from [@Psychedelic](https://github.com/psychedelic) via the NPM CLI.  To do so you'll need:

**A [personal access token](https://github.com/psychedelic) with the following scopes selected**

- **repo** → [ full control to private repositories]
- **read:packages** → [Download packages from GitHub Package Registry]
- **read:org** → [Read org and team membership, read org projects]
- Authentication via npm login, using your GitHub username for the username, the personal access token as your password, and your GitHub email as the email address.

Once you have those ready, run:

```js
npm login --registry=https://npm.pkg.github.com --scope=@Psychedelic
```

> Note: You only need to configure this once to install the package! On npm login provide your Github email as your username and the Personal access token as the password.

The last thing we’ve got to do before installing is setting your npm configuration so that when you run ‘npm install @psychedelic/<repo-name-here>’ npm will pull from Github instead of its own registry.

To do this, run:

```js
npm config set @psychedelic:registry https://npm.pkg.github.com
```

You’re all set! You can now install CAP-js by running:

```js
yarn add @psychedelic/cap-js
```

## Importing CAP-js
To interact with CAP-js we are going to need to import two objects into our application; the Router & Root.

First, an example to better understand CAP’s structure. 

You can imagine CAP like a brewery. In this case, the Router object is like a brewmaster. It has the job of overseeing all beer production (transactions) and must keep track of when, where, and by who each different beer (transaction) is produced in the brewery (NFTs/Tokens using CAP, or the beer's brand!).

A Root object can be thought of like a vat in the brewery. Vats hold all of the beer (transactions) for one specific brand (NFT/Token using CAP). Vats can also be tapped to access their contents (see transactions.).

### Importing Router & Root

```
import { CapRouter, CapRoot } from '@psychedelic/cap-js';
```
Why must we import two different objects instead of interacting with one universal object? Think back to our brewery example. Similar to how there is only ever one brewmaster in a brewery, our application only needs one instance of the Router. 

Additionally, we will have to spawn a new Root instance every time we add a canister just like a brewery would have to add another vat when they add a new brand of beer to production. This relationship between only ever having one Router no matter how many Roots there are, is why we import each object individually. 

## Talking to the Router 🗣 - Query CAP to See Available Histories

We will now initialize the Router to start talking to it. When you talk to the router **you are asking CAP's main canister (Router)** what NFT/Token histories are available in the entire open internet service.

But first, lets initialize it. To do so, we call Router’s init function. The init function takes two optional parameters: 

- `host`: defaults to IC mainnet
- `canisterId`: defaults to CAP’s mainnet canister ID

Here’s an example: 

```js
import { CapRouter } from '@psychedelic/cap-js';

const getCapRouterInstance = async ({
  canisterId,
  host,
}: {
  canisterId?: string,
  host?: string,
}) => await CapRouter.init({
  host,
  canisterId,
});

// On a hypotetical application top-level or entry-point
(async () => {
	const capRouter = new getCapRouterInstance();
})();
```

### Asking the Router What Token/NFT Histories are Available

Why have a chat with the Router? He can tell you external information about any or all histories available in CAP. Meaning, all the histories of NFTs/Tokens that integrate CAP.

That's the cool thing. Instead of having to interact/integrate them individually, you can use the Router to find the ones you need (the Tokens where a user has records, or a specific NFT's history, or all of them!).

**There are three ways to ask CAP for this information:**

- Ask for all available histories → `get_index_canisters( );`
- Ask about a specific NFT/Token's history → `get_token_contract_root_bucket( );`
- Ask for histories a user interacted with → `get_user_root_buckets( );`

The Router will respond all the available histories based on what you asked; and you will be able to interact now with each history (Root) to get specific transaction data.

#### get_index_canisters( );
Returns all available history canisters (Roots) for all NFTs/Tokens using CAP.

- `witness`: The optional Certified response, defaults to false.

```js
capRouter.get_index_canisters(witness)
```

#### get_token_contract_root_bucket( );
Returns the history canister (Root) for a specific Token/NFT project. How do you do so? By passing the Token/NFTs contract canister ID (e.g. XTC's main canister ID). CAP will check if that canister has an associated history, and return the Canister ID of it.

- `canister`: Canister ID of the token/NFT contract.
- `witness`: The optional Certified response, defaults to false.

```js
capRouter.get_token_contract_root_bucket({canister, witness})
```

#### get_user_root_buckets( );
With this method you can ask the router for all the NFT/Token histories in CAP that a specific user (Principal ID) has interacted with.

- `user`: The user principal of the requested transactions.
- `witness`: The optional Certified response, defaults to false.

```js
capRouter.get_user_root_buckets({user, witness})
```

## Talking to the Root(s)🚰 - Query Transaction Data from Histories

Just like tapping a vat, we can hook up to our a specific Token or NFTs history in CAP (Root) to extract some of its contents (transactions).

To do so, **you need to instantiate that Root/history**. You will use the Canister IDs the Router provided in the step before to instantiate the different Root/histories. You will pass the canisterID of that Root, and the host will default to the IC mainnet.

```js
import { CapRoot } from '@psychedelic/cap-js';

const getCapRootInstance = async ({
  canisterId,
  host,
}: {
  canisterId: string,
  host?: string,
}) => await CapRoot.init({
  host,
  canisterId,
});

// On a short lived section of your application
(async () => {
    const capRouter = new getCapRootInstance({
        canisterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
    });
})();
```

### Available Methods for Querying Data 

With the Root/History of your desired NFT/Token instantiated, you can start querying data! Three ways to tap into a vat (Root):

- Ask for a single transaction → get_transaction( );
- Ask for all transactions → get_transactions( ); 
- Ask for a specific case of beer → get_user_transactions( );

#### get_transaction( );
Allows you to query a specific transaction in that Token/NFT's history. You pass an ID for the index of the transaction you are looking to query.

- `id`: the global txnId of a transaction.
- `witness`: the optional witness for certified response.

```js
capRoot.get_transaction(id, witness)
```

#### get_transactions( );
Allows you to query all available transactions in the NFT/Token's history. It will return page objects of up to 64 transactions each. This method always defaults to the most recent 64 transactions.

- `page`: The optional number of the page to query for transactions, each page can hold up to 64 transactions. Defaults to page 0.
- `witness`: the optional witness for certified response.

```js
capRoot.get_transactions({page, witness})
```

#### get_user_transactions( );
Allows you to query all available transactions for a specific user (Principal ID). You pass a Principal ID and it will return a page object (similarly to the method above) with the transactions tied to that specific user. If you don't specify a page,

- `page`: The optional number of the page to query for transactions, each page can hold up to 64 transactions. Defaults to page 0.
- `user`: The user principal of the requested transactions.
- `witness`: the optional witness for certified response.

```js
capRoot.get_user_transactions(({page, user, witness})
```

