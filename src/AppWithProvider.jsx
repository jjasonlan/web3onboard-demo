import React from 'react'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import capsuleModule from '@web3-onboard/capsule'
import App from "./App"

const blocknativeApiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

const injected = injectedModule()
const capsule = capsuleModule({
  environment: "BETA",
  apiKey: CAPSULE_API_KEY,
})

// initialize Onboard
const web3Onboard = init({
  apiKey: blocknativeApiKey,
  wallets: [injected, capsule],
  chains: [
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: `https://goerli.infura.io/v3/asdf`
    },
    // bug with sepolia?
    // {
    //   id: '0xaa36a7',
    //   token: 'ETH',
    //   label: 'Sepolia',
    //   rpcUrl: 'https://sepolia.infura.io/v3/961364684c7346c080994baab1469ea8'
    // }
  ],
  appMetadata: {
    name: 'Capsule Blocknative Demo',
    icon: 'capsule-logo.svg',
    logo: 'capsule-logo.svg',
    description: 'Capsule Demo app using Onboard',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }
})

function AppWithProvider() {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <App />
    </Web3OnboardProvider>
  )
}

export default AppWithProvider
