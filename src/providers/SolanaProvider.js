import React, { FC, useEffect, useMemo, useState } from 'react';
import { ConnectionProvider, WalletContext, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletConfigError } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
   WalletModalProvider,
   WalletDisconnectButton,
   WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Config } from "../config";
import SolflareClass from "@solflare-wallet/sdk";
import { SolanaContext } from '../context';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const SolanaProvider = ({ children }) => {
   // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
   const [authed, setAuthed] = useState(false);
   const network = Config.NETWORK;
   const [wallet, setWallet] = useState({});

   useEffect(() => {
      connect();
   }, []);

   const connect = async () => {
      let solflare;

      try {
         solflare = new SolflareClass({ network });

         if (!solflare.connected) {
            await solflare.connect();

            setAuthed(true);

            setWallet(wallet => (
               {
                  ...wallet,
                  // wallet: solflare,
                  publicKey: solflare.publicKey,
                  publicKeyStr: solflare.publicKey.toBase58()
               }
            ))

            // console.log(solflare);
            // window.location.href = "/#/home";
         }
      } catch (error) {
         throw new WalletConfigError(error?.message, error);
      }
   };

   // You can also provide a custom RPC endpoint.
   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

   const wallets = useMemo(
      () => [
         new UnsafeBurnerWalletAdapter(),
      ],
      [network]
   );

   return (
      <ConnectionProvider endpoint={endpoint}>
         <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
               {/* <WalletMultiButton />
               <WalletDisconnectButton /> */}
               {
                  authed  &&
                  <SolanaContext.Provider value={wallet}>
                     {children}
                  </SolanaContext.Provider>
               }
            </WalletModalProvider>
         </WalletProvider>
      </ConnectionProvider>
   );
}