---
date: "1"
---
# Welcome to Cover ✅

![](./imgs/mainn.png)

Cover is an open internet service that can be used by developers to verify and prove that a canister's code matches the open source code. Reducing the risk of malicious apps & increasing transparency and trust.

- Visit [our website](https://covercode.ooo)
- Visit [Cover's repository](https://github.com/psychedelic/cover)
- Follow [Cover on Twitter](https://twitter.com/cover_ois) 



## ✅ Cover - Code Verification on the Internet Computer

Cover as an open internet service is integrated into the developer's natural workflow using a GitHub action that, during the developer's flow for producing their canister's WASM file, submits that build/WASM file details to the Cover registry.

That submission includes all details (WASM checksum, code repository, etc.) needed to cross-reference to the live canister on mainnet (by comparing WASM checksums). If the WASM checksums match, then the canister's code is verified openly in Cover, if it doesn't, it means the code submitted to Cover isn't the same as the live canister on mainnet (unverified, and potentially malicious).

- [Visit the overview section to learn more about how it works.](https://docs.covercode.ooo/overview/what-is-cover/)


## 🧰 Getting Started with Cover

With Cover, there are primarily **two use cases**. One is developer oriented, who will use CAP to submit a verification for their canister (to ensure the live WASM file matches the shared open source code) as a public check and proof of the code's veracity. 

On the other hand, users or UIs can query Cover's registry to check a canister's latest verification submission (latest build) and see if it matches the live canister's checksum (if it does, it's verified, else it is not).

### 1. Using Cover to Verify your Canister's Code (WASM)

Integrate Cover's GitHub action in your development workflow so that you can start submitting your canister/WASM build details for verification upon each new build/push.

- [Visit our getting started guide.](https://docs.covercode.ooo/overview/what-is-cover/)

### 2. Querying the Cover Registry to Check a Canister's Verification Status

To check a canister's verification status in Cover, you need to query its registry and compare the WASM checksum with the live canister on the Internet Computer's mainnet.

- [Visit our guide for thi.](https://docs.covercode.ooo/check-status/what-is-cover/)
