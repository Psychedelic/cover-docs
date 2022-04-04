---
date: "1"
---
# Welcome to Cover ✅

![](./imgs/mainn.png)

Cover is an open internet service that can be used by developers to verify and prove that a canister's code matches the open source code. Reducing the risk of malicious apps & increasing transparency and trust.

You can think of Cover as a registry of verified source code that developers/publishers submit their canister's code to (a version registry is kept). Since a canister's code can't be verified directly, the data in Cover's registry is used to compare with the live canister's WASM hash matches the public records in Cover, and is not a modified, malicious, or undisclosed version. 

This helps reduce **malicious actors with transparency, and visibility**, since developers will strive to maintain a public, and matching, record of their builds. Anyone can check a canister's submitted builds in Covers registry, and compare them to their live version to confirm its verified status, and that the open source code indeed matches the live implementation.

- Visit [our website](https://covercode.ooo)
- Visit [Cover's repository](https://github.com/psychedelic/cover)
- Follow [Cover on Twitter](https://twitter.com/cover_ois)


## ✅ Cover - Code Verification on the Internet Computer

Cover is an open internet service that builds your canister wasm with the same environment as yours and saves the build details to the Cover registry for public validation.

That submission includes all details (WASM hash, code repository, etc.) needed to cross-reference to the live canister on the mainnet (by comparing WASM hashes). If the WASM hashes match, then the canister's code is verified openly in Cover, if it doesn't, it means the code submitted to Cover isn't the same as the live canister on the mainnet (unverified, and potentially malicious).

- [Visit the overview section to learn more about how it works.](https://docs.covercode.ooo/overview/what-is-cover/)


## 🧰 Getting Started with Cover

Cover primarily use as a public check and proof of the code's veracity. 

Cover will reproduce your canister wasm hash and store the wasm hash along with all the build information in Cover's verification then compare it to the wasm hash on IC network, it matches, it's verified, else it is not

Users also can use Cover to check a canister verify information.

### 1. Using Cover to Verify your Canister's Code (WASM)

Set up build environment and start submitting your canister/WASM build config

- [Visit our getting started guide.](https://docs.covercode.ooo/integrate-cover/getting-started/)

### 2. Get canister verification result

Cover provides several ways to check your result

- [Visit our guide for querying a canister's verification status.](https://docs.covercode.ooo/check-status/getting-started/)
