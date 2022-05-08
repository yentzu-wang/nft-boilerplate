## Get started:

1. Run `yarn install`
2. Save `.env.sample` as `.env` and fill up all required variables.
3. As mentioned above, if you want to use rinkeby network, use `NETWORK=rinkeby`, otherwise use `NETWORK=ethereum` in `.env`.

## Build contracts

`yarn truffle compile`

## Deploy contracts

Testnet:
`yarn deploy-rinkeby`

Mainnet:
`yarn deploy`

## Verify contracts

Add the etherscan api key `.env` variable and run:

`yarn truffle run verify ContractNameA ContractNameB... --network rinkeby`
