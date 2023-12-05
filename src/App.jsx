import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { useConnectWallet } from "@web3-onboard/react"
import NFT_ABI from "./NFT_ABI.json"
import "./App.css"

const NFT_CONTRACT_ADDRESS = '0xdAfB9d117B585E406A74E84977Fa82DdEE8B0a32';

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [walletHasNFT, setWalletHasNFT] = useState(false);
  
  useEffect(() => {
    if (!wallet) return
    const checkNFTStatus = async () => {
      const res = await hasMintedNFT()
      setWalletHasNFT(res)
    };
    
    checkNFTStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet])

  async function hasMintedNFT() {
    const ethersProvider = new ethers.BrowserProvider(wallet.provider, 'sepolia')
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, ethersProvider);
    const res = await contract.balanceOf(wallet.accounts[0].address)
    return res && parseInt(res) === 1
  }
  
  return (
    <div className='container'>
      <h1>Capsule BlockNative Demo App</h1>
      <p>An NFT-gated experience, powered by Capsule via Blocknative's <a href="https://docs.blocknative.com/onboard">Web3Onboard</a>.</p>
      <p>Unlock cross-app superpowers with Capsule!</p>
      <button className="connect-button" disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
      {wallet && <div className='content'>
        {walletHasNFT ? (
          <>
            <img src="Eastern_Crown_(Heraldry).svg" alt="crown for being awesome"/>
            <span>
              You've got the Capsule NFT! You can access our secret exclusive content. :)
            </span>
          </>
        ) : (
          <>
            <img src="Red_X.svg" alt="error icon"/>
            <span>
              You are missing the Capsule NFT! Please visit <a href="https://demo.beta.usecapsule.com/">https://demo.beta.usecapsule.com/</a> to mint.
            </span>
          </>
        )}
      </div>}
    </div>
  );
}

export default App;
