// Start by importing the CapRouter instance
// a CapRoot is also available for Root bucket methods
// See CAP Candid/IDL's (https://github.com/Psychedelic/cap)
const{ CapRouter, CapRoot } = require('@psychedelic/cap-js');
// The Principal is required to handle
// the principal object type which is passed
// to the CapRouter method(s)
// e.g. Principal is an object and not a string
const { Principal } = require('@dfinity/principal');

// The mainnet address
const mainnet = 'https://ic0.app/'

// The Router canister id
const routerCanisterId = 'lj532-6iaaa-aaaah-qcc7a-cai';
// The Management Canister is `aaaaa-aa`
// the default Principal falls back to
const managementCanisterPrincipal = Principal.fromHex('');

// On a hypotetical application top-level or entry-point
(async () => {
  let capRouter;

  try {
    // Call `init` to create an instance of CapRouter
    // the CapRouter instance can be used throughout the application lifetime
    // e.g. if you instantiate it at the top-level, you can reuse it
    // because the canister id does not need to be updated (common use-cases)
    capRouter = await CapRouter.init({
      host: mainnet,
      canisterId: routerCanisterId,
    });
  } catch (err) {
    console.warn('Oops! Failed to initiate the CapRouter');
    console.error(err);
  }

  if (typeof capRouter.get_user_root_buckets !== 'function') {
    throw Error('Oops! Unexpected Cap Router instance...');
  }

  // The methods are asynchronous
  // for that reason, can only be called and awaited for inside
  // an async function, unless the promise `then` syntax, is preferred
  const { contracts } = await capRouter.get_user_root_buckets({
    user: managementCanisterPrincipal,
  });

  if (
      !Array.isArray(contracts)
      || !contracts.length
    ) {
    throw Error('Oops! Failed to get user root buckets');
  }


  console.log(`🤖 Token contracts for ${managementCanisterPrincipal.toText()}:`);

  // Iterate over the token contracts principals
  // aka the root buckets
  contracts.forEach(
    (principal) => console.log(
        principal.toText(),
      ),
  );

  // Given the token contract id, we can retrieve resources
  // that the root bucket have
  let capRoot;

  try {
    // Let's say we are interested in the first canister id
    // from our CapRouter response we got earlier
    const tokenCanisterId = contracts[0];

    // So far we haven't declared the host
    // as we are happy to use the default hostname
    // which points to the mainnet
    // otherwise, we are free to assign it
    capRoot = await CapRoot.init({
      canisterId: tokenCanisterId,
    });
  } catch (err) {
    console.warn('Oops! CAP instance initialisation failed with', err);
  }

  if (typeof capRoot.get_transactions !== 'function') {
    throw Error('Oops! Unexpected Cap Root instance...');
  }

  // When page is omitted, we get returned the most recent data page
  // as a positive numerical number that starts count from zero
  // where zero is the page that containts the first and oldest history data
  // Alternatively, we can select the page we desire to fetch the data
  // by declaring the `page` value (e.g. { page: 2 })
  const capRootResponse = await capRoot.get_transactions({
    witness: false,
  });

  const { data, page } = capRootResponse;

  if (!Array.isArray(data)) {
    throw Error('Oops! Unexpected transactions data...');
  }

  if (data.length === 0) {
    console.warn('⚠️ There isn\'t any transaction data available yet');
  }

  // Each page of CAP at time of writing is of size 64
  // there are 64 maximum items in each transactions response page
  const pageSize = 64;
  // The total numer of transactions is a simple computation
  // where we multiply the page size by the current page number
  // and sum the number of items the page currently has
  const totalTransactions = pageSize * page + data.length;

  console.info(`Yeh 🌈 ${totalTransactions} were found!`);
  console.log(JSON.stringify(data));
})();
