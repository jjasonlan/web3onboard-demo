import { ethers } from 'ethers'
import { useConnectWallet } from "@web3-onboard/react"
import "./App.css"

function App() {

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    // if using ethers v6 this is:
    ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
  }

  return (
    <div className='container'>
      <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
    </div>
  );
}

export default App;
