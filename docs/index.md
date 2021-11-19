---
date: "1"
---
# Welcome to Cover ✅

![](./imgs/mainn.png)

Cover is an open internet service that can be used by developers to verify and prove that a canister's code matches the open source code. Reducing the risk of malicious apps & increasing transparency and trust.

You can think of Cover as a registry of verified source code that developers/publishers submit their canister's code to (a version registry is kept). Since a canister's code can't be verified directly, the data in Cover's registry is used to compare with the live canister's WASM checksum matches the public records in Cover, and is not a modified, malicious, or undisclosed version. 

This helps reduce **malicious actors with transparency, and visibility**, since developers will strive to maintain a public, and matching, record of their builds. Anyone can check a canister's submitted builds in Covers registry, and compare them to their live version to confirm its verified status, and that the open source code indeed matches the live implementation.

- Visit [our website](https://covercode.ooo)
- Visit [Cover's repository](https://github.com/psychedelic/cover)
- Follow [Cover on Twitter](https://twitter.com/cover_ois) 

!!! Important

    This is an alpha release ✨ so that developers can start to play around, test the general Cover architecture during the weekend, and provide feedback to us! The alpha registry shouldn't be considered dependable yet. We will follow-up next week with a release that will include the permissioning ruling necessary to ensure all submissions are fully trusted.


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

- [Visit our guide for querying a canister's verification status.](https://docs.covercode.ooo/check-status/what-is-cover/)
