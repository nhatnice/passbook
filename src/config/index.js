import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const getSolanaNetwork = () => {
    const envNet = process.env.REACT_APP_SOLANA_NETWORK;
    if (envNet === "devnet") return WalletAdapterNetwork.Devnet;
    if (envNet === "mainnet-beta") return WalletAdapterNetwork.Mainnet;
    return WalletAdapterNetwork.Testnet;
};

export const Config = {
    PINATA: {
        KEY: process.env.REACT_APP_PINATA_KEY || "",
        SECRET: process.env.REACT_APP_PINATA_SECRET || "",
        FILE_URL: process.env.REACT_APP_PINATA_FILE_URL || "https://gateway.pinata.cloud/ipfs/",
    },
    WEB3_STORAGE_TOKEN: process.env.REACT_APP_WEB3_STORAGE_TOKEN || "",
    IPFS_LINK: process.env.REACT_APP_IPFS_LINK || "https://dweb.link/ipfs/",
    NETWORK: getSolanaNetwork(),
    ENDPOINT: process.env.REACT_APP_SOLANA_RPC_ENDPOINT || "http://127.0.0.1:8899",
    WALLET_SECRECT: process.env.REACT_APP_WALLET_SECRET || "",
    VARIABLES: {
        TICKET_TYPES: [
            {
                label: "Ticket",
                value: "ticket"
            }, {
                label: "NFT",
                value: "nft"
            }
        ],
        TICKET_CATEGORIES: [
            {
                label: "Music",
                value: "music"
            }, {
                label: "Movie",
                value: "movie"
            }, {
                label: "Technology",
                value: "tech"
            }, {
                label: "Sports",
                value: "sports"
            }
        ]
    },
    MOTOKO: {
        PRICE_E8S: 1000 * 1000 * 100
    },
    IMGUR_CLIENT_ID: process.env.REACT_APP_IMGUR_CLIENT_ID || "",
    TOKEN: {
        NAME: "PassBook Coin",
        SYMBOL: "đ"
    }
}
