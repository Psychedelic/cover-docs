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

What will you need to get started? **Your canister´s repository should be on GitHub, and open source**, and you need the Canister ID of the canister you are developing.

Inside of your canister repo create a directory `.github/workflows/` and add a `myBuild.yml` file, **that includes Cover's GitHub Action**. This is what that snippet of code should look like, where you pass:

- `canister_id`: Canister ID of the canister you're making a submission for.
- `wasm_path`: file path to the wasm that will be submitted.

```yaml
      - name: Cover Validator Plugin
        uses: Psychedelic/cover/GithubActionPlugin@main
        with:
          canister_id: "iftvq-niaaa-aaaai-qasga-cai"
          wasm_path: "target/wasm32-unknown-unknown/release/canister.wasm"
```

### Using Cover's Canister as an Example

Let's give an example by showing how we would submit Cover's own canister for verification! To see a full build example see [build.yml](.github/workflows/build.yml)

You can see that here Cover's GitHub Action is run last after the WASM is built.

```yaml

name: Example canister build using build.js 

on:
  push:
    branches:
      - production
      - main
jobs:
  build:
    runs-on: ubuntu-latest

    container:
      image: fleek/dfxrust

    steps:
      - uses: actions/checkout@v2

      - name: Build WASM
          # HACK: set HOME to get github actions to execute correctly
          export HOME=/root
          export PATH="$HOME/.cargo/bin:${PATH}"
          # Start build
          yarn
          MODE=PRODUCTION dfx build cover --check

      - name: Cover Validator Plugin
        uses: Psychedelic/cover/GithubActionPlugin@main
        with:
          canister_id: "iftvq-niaaa-aaaai-qasga-cai"
          wasm_path: ".dfx/local/canisters/cover/cover.wasm"
```

As simple as that!

Whenever you push your code using `production` or `main` branches, the above workflow will be triggered.

If you successfully generated the canister.wasm the [Cover Validation Plugin](./GithubActionPlugin) will call an AWS Lambda Function that will add the validation results to the [Cover canister](https://ic.rocks/principal/iftvq-niaaa-aaaai-qasga-cai).

**There is some work, however** that you need to do to ensure GitHub is able to wild the same WASM files as you do locally, see the section below:

### Matching Canister Builds

In order to get the same WASM files on github actions and locally, we need to ensure that the build environment on github actions is EXACTLY the same as the local one. 
Thus, if you want to generate a wasm file locally, you must use the same docker image as the github actions is using.

You can either provide your own docker image (We suggest you use ubuntu:20:04 at the base) or 
you use our fleek/dfxrust docker image that includes tools needed to build Rust based canisters. 
The fleek/dfxrust image is build with this [Dockerfile](GithubActionPlugin/dockers/dfxrust/Dockerfile). 

#### Executing local build 

To execute a local build using fleek/dfxrust image, in your local folder run 
 `GithubActionPlugin/dockers/docker-build.sh` to generate wasm files inside of folder `./dfx-build`.

You can tweak the docker-build.sh and the entrypoint.sh scripts to your needs. Just make sure that the 
entrypoint.sh matches your Buld.WASM section in github actions. 