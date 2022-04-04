---
date: "1"
---
# ❓ Checking Verification Status

## ❓ Checking Verification Status

**What information can you query from Cover?**

You can query **all the information** in Cover verification, that includes:

- WASM hash
- Canister ID
- Link to the repository
- Build information


## Querying Cover's Registry for a Canister ID


To check a canister's verification status in Cover, you have to query the Cover canister, **which you can do so for example through the DFX CLI.** 

- You can either call it directly:

```bash
dfx canister --network ic call iftvq-niaaa-aaaai-qasga-cai getVerificationByCanisterId '(principal"rrkah-fqaaa-aaaaa-aaaaq-cai")'
```

and compare the verification wasm hash with the one on IC network

```bash
dfx canister --network ic info CANISTER_ID       
```

- Use Cover SDK ([Guidance and example](https://github.com/Psychedelic/cover-sdk#typescript-example))
- Use [Cover page]() and search for the canister ID you need (coming soon)
