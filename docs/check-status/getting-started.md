---
date: "1"
---
# ❓ Checking Verification Status & Build History

## ❓ Checking Verification Status & Build History

Whether you are an UI/interface wanting to surface a Canister's verification status in Cover; or a user/developer wanting to confirm your live canister's WASM checksum matches your latest submission on Cover (and therefore is considered verified!), you will need to **query Cover for this information**.


**What information can you query from Cover?**

You can query **all the information** that is provided when new submissions are made, that includes:

- WASM Checksum
- Canister ID
- Link to the repository
- Build information

All that information will be versioned and can be utilized to compare the WASM checksum of the live canister, and verify it is up to date and verified with the open source submitted core.


## Querying Cover's Registry for a Canister ID


After a few minutes, you should be able to query the Cover canister. You can either call it directly:

```sh
dfx canister --network=ic call iftvq-niaaa-aaaai-qasga-cai get_verification_by_canister_id '(principal"rrkah-fqaaa-aaaaa-aaaaq-cai")'
```

or you can save the cover canister id in `canister_ids.json`:
```json
{
  "cover": {
    "ic": "iftvq-niaaa-aaaai-qasga-cai"
  }
}
```
And enquire about any canister id:
```sh
dfx canister --network=ic call cover get_verification_by_canister_id '(principal"rrkah-fqaaa-aaaaa-aaaaq-cai")'

( opt record { 
  wasm_checksum = "0xecb74c834fcd93d27dd2c0e35410c3b34cf9f7c45e4721a2fbd92a7babf11eaf"; 
  updated_at = "2021-11-19T15:00:00.280+00:00"; 
  updated_by = principal "6cu3r-liw3y-hmevf-e74z4-ogury-e7ur6-xpyka-764on-gcaqs-cbjps-7qe"; 
  source_snapshot_url = "NA"; 
  canister_id = principal "rrkah-fqaaa-aaaaa-aaaaq-cai"; 
  created_at = "2021-11-19T15:00:00.280+00:00"; 
  created_by = principal "6cu3r-liw3y-hmevf-e74z4-ogury-e7ur6-xpyka-764on-gcaqs-cbjps-7qe";
  git_repo = "Psychedeleic/cover"; 
  git_ref = "refs/heads/main"; 
  git_sha = "ef9ff448ad0973a193d479e7842aa0f7e2bccfdf"; 
  build_log_url = "NA"; 
}, )
```

Now you can compare the returned `wasm_checksum` against the deployed canister Module hash.
To get the canister module hash run:
```sh
dfx canister --no-wallet --network ic info iftvq-niaaa-aaaai-qasga-cai          

Controllers: ique5-maaaa-aaaai-qasfq-cai rftgd-dz3se-hrufx-kwtpc-bc5hj-ha54l-lhxnm-chz5z-5tfmq-6th4y-eqe s4jec-wiaaa-aaaah-qch4q-cai
Module hash: 0xecb74c834fcd93d27dd2c0e35410c3b34cf9f7c45e4721a2fbd92a7babf11eaf
```

You can see that the checksums are equal. 

## Using the Cover Verification Tool

Alternatively, you can also use a tool called cover verification that will abstract the process detailed above.
```
cover-verification rrkah-fqaaa-aaaaa-aaaaq-cai

Wasm checksum = "0xecb74c834fcd93d27dd2c0e35410c3b34cf9f7c45e4721a2fbd92a7babf11eaf"
Module hash: 0xecb74c834fcd93d27dd2c0e35410c3b34cf9f7c45e4721a2fbd92a7babf11eaf
Status: Verified
```