import React from 'react'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import capsuleModule from '@web3-onboard/capsule'
import App from "./App"

const blocknativeApiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'
const CAPSULE_API_KEY = "d0b61c2c8865aaa2fb12886651627271";

const capsule = capsuleModule({
  environment: "BETA",
  apiKey: CAPSULE_API_KEY,
})

// initialize Onboard
const web3Onboard = init({
  apiKey: blocknativeApiKey,
  wallets: [capsule],
  chains: [
    {
      id: 11155111,
      token: 'ETH',
      label: 'Sepolia',
      rpcUrl: 'https://sepolia.infura.io/v3/961364684c7346c080994baab1469ea8'
    }
  ],
  appMetadata: {
    name: 'Capsule Blocknative Demo',
    icon: 'capsule-logo.svg',
    logo: 'capsule-logo.svg',
    description: 'Capsule Demo app using Onboard',
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
