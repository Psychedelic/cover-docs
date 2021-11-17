---
date: "1"
---
# ✅ Integrate Cover & Verify a Canister's Code
## ✅ Integrate Cover & Verify a Canister's Code

To start using Cover to verify your canister's code, and then continuously push new versions/builds to Cover's code verification registry **you need to integrate Cover's GitHub Action** to your WASM development workflow.

This GitHub action will collect:

- WASM Checksum
- Canister ID
- Link to the repository
- Build information

And that information will be passed along to the Cover registry, stored under the provided Canister ID's registry. Each submission will compose a new build/version record of the submitted verified code. 

The concept is simple. Using this GitHub action, you can integrate Cover into your natural WASM file development flow, so that each time you generate a new WASM file to install/update on your mainnet canister, the new version/build is sent to Cover's registry during that process and ready to be compared to the mainnet version to confirm its validity.

## Using Cover's GitHub Action

To get started...