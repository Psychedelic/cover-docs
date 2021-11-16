---
date: "1"
---
# ⚡ Integrating CAP - New & Existing Projects
## ⚡ Integrating CAP - New & Existing Projects

To integrate CAP, a Token or NFT must use the **CAP SDK**. A development kit we created to facilitate the integration of **new or existing projects**.

- Visit [CAP-SDK repository](https://github.com/Psychedelic/cap/tree/main/sdk)
- CAP's Mainnet canister: `lj532-6iaaa-aaaah-qcc7a-cai`

!!! Important

    This is an early version of the documentation! 🚧 we will continue to grow this with examples and guides as the SDK and CAP itself is being developed.


-----



The following guide will take you through creating a sample project (NFT/Token) that uses **CAP for its event history**. It will create a simple token that registers with CAP and then submits and retrieves events. It is recommended that you read the CAP specifications to understand how CAP works. 

- **That can be found here **https://github.com/Psychedelic/cap/tree/main/spec

----

## Integrating CAP to an NFT/Token Canister 🧰

The first step is to create a simple project. Here we will create an **empty Rust project**. Note: this assumes your machine is already set up for IC development. Please make sure you have dfx, ic-optimizer and the wasm target installed on your machine.

[Here is an empty Rust IC boilerplate you can get started with in this example:](https://github.com/Psychedelic/cap-example/tree/empty)

You can clone this or fork it to start your own project. **Alternatively, if you want to see the finished example and not just excerpts,** [visit the final version.](https://github.com/Psychedelic/cap/tree/docs/example/canisters/sdk_example)

```rust
cap-sdk = { git = "https://github.com/Psychedelic/cap.git", branch = "cap-sdk" }
cap-sdk-core = { git = "https://github.com/Psychedelic/cap.git", branch = "cap-sdk" }
```

Note, currently it is under development so we are pointing to the **Github version**. Once it is published, you can point directly to the published crate.

### Create a Canister and Register it With CAP 🛢️

The next step is to create the constructor and add the **root bucket and register it with CAP for your token**. 

First, let’s create a constructor for this token so that in it, we will set up the CAP root bucket.

```rust
#[init]
fn init() {
 
}
```

Then, we will create a canister and register it with the CAP This can be done using the initialization helper in the SDK:

```rust
fn init(cycles: u64) {
   let data = ic::get_mut::<Data>();
   data.owner = ic::caller();
}
```

This is required because CAP follows a **hub and spoke architecture**. There is a central canister we call the router that facilitates onboarding of new NFTs/Tokens integrating and the management of CAP.  

Root canisters (transaction histories) are created for each token that wants to use CAP, and is registered with the CAP router.  After initialisation, your app can hit your root canister directly without having to go through the router anymore, and will be the only canister that will be able to send records to it.

## Inserting Events & Sending Records to CAP 🛰️

Now, let’s insert events.  For the purposes of this example, let’s create 2 simple functions, mint and transfer that will let users mint and transfer their tokens respectively.

```rust
#[update(name = "mint")]
#[candid_method(update)]
pub async fn mint(owner: Principal) -> u64 {
 
}
 
#[update(name = "transfer")]
#[candid_method(update)]
pub async fn transfer(new_owner: Principal, token_id: u64) {
 
}
```

Now, we can use the insert helper from the SDK to add events to CAP:

```rust
#[update(name = "mint")]
#[candid_method(update)]
pub async fn mint(owner: Principal) -> u64 {
 
	// other stuff
	
let transaction_details = MintDetails {
       owner: owner,
       token_id,
       cycles: available,
   };
 
   data.nft_owners.insert(transaction_details.token_id, owner);
 
   data.next_id += 1;
 
   let event = IndefiniteEventBuilder::new()
       .caller(ic::caller())
       .operation(String::from("mint"))
       .details(transaction_details)
       .build()
       .unwrap();
 
   insert(event).await.unwrap();
}
```

Let’s take a look at that payload we inserted.  The fields in the first level are common fields to all CAP events. The details field is where we let you add any number of fields that are unique to your application.  

In this case we are capturing a mint so we want to capture things like who the token should be assigned to, and the token ID. Similarly, you can do an insert for the transfer function as well. Note the different fields this time:

```rust
#[update(name = "transfer")]
#[candid_method(update)]
pub async fn transfer(new_owner: Principal, token_id: u64) {
    // other stuff
 
   let transaction_details = TransferDetails {
       to: new_owner,
       token_id: token_id,
   };
 
   let event = IndefiniteEventBuilder::new()
       .caller(ic::caller())
       .operation(String::from("transfer"))
       .details(transaction_details)
       .build()
       .unwrap();
 
   insert(event).await.unwrap();
}
```

The idea is that you can add these inserts anywhere in your code whenever there is an event you want to capture and query later.

## Maintenance of One’s History in CAP 🔋

Currently Psychedelic will manage the cycles for the router canister, but do make sure your root canister is loaded with cycles.

Eventually we will introduce an automatic reloading feature with cycles and fund that through fees but that will be a future release. 

Also do note, this is an alpha release of CAP and it is subject to heavy development and please keep us informed of any bugs or issues you face.

## Querying Events/Transactions 🗄️
### Querying Events/Transactions from the NFT/Token Canister

Now when it comes to querying these events, the SDK also provides helper functions you can use.  Let’s create a simple function that will return a specific event. This is a simple wrapper on the get_transaction call to demonstrate how it’s used. It basically looks up a transaction in CAP and returns the details.

```rust
#[candid_method(update)]
#[update(name = "get_transaction_by_id")]
pub async fn get_transaction_by_id(id: u64) -> Event {
 
}
```

Similarly, there are other query functions that let you get all transactions, or just the transactions for a user that you can use.

```rust
#[candid_method(update)]
#[update(name = "get_transaction_by_id")]
pub async fn get_transaction_by_id(id: u64) -> Event {
   let ctx = get_context();
 
   let result = get_transaction(id).await;
 
   let tx = match result {
       Ok(t) => t,
       Err(e) => {
           panic!("Error finding transactions.");
       }
   };
 
   tx
}
```

This highlights the main interactions with CAP. But there are helpers and other data structures that are needed to make this work. You can find them all in a **full working example here:** https://github.com/Psychedelic/cap/tree/docs/example/canisters/sdk_example

### Querying Events/Transactions from CAP Directly

Having said that, since your CAP router has query functions available on it, you can query it directly from the frontend as well, i.e., it's not required to query through a canister only like in the above example. You can take a look at CAP-JS (https://docs.cap.ooo/surface-data/getting-started/) to see the helper for that and how it’s done
 
That’s it!  CAP and the CAP SDK do the heavy lifting so you can simply register, insert and query and focus on your application.