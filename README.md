# Solana Liquidity Pool Tracker

A Solana project for tracking liquidity pool activities using the Raydium DEX.

## Overview

The Solana Liquidity Pool Tracker is a tool designed to monitor and provide insights into liquidity pool activities on the Raydium decentralized exchange (DEX) on the Solana blockchain. The project leverages the Solana web3.js library to interact with the Solana blockchain, specifically targeting transactions related to liquidity pool creation.

## Features

- **Real-time Monitoring:** The tracker continuously monitors Solana transactions to identify new liquidity pools created through the Raydium DEX.

- **QuickNode Integration:** Utilizes QuickNode for enhanced Solana RPC access, ensuring fast and reliable data retrieval.

- **Telegram Notifications:** Sends real-time notifications to a specified Telegram channel or chat, providing details about newly created liquidity pools.

- **Credits Tracking:** Keeps track of QuickNode credits used during the tracking session.

## Prerequisites

Before using the Solana Liquidity Pool Tracker, make sure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Solana CLI
- Telegram Bot API Key

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Mide001/raydium-event-notfier.git
    cd raydium-event-notfier
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your configuration:

    Copy the `.env.example` file to `.env` and update it with your configuration details.

## Usage

1. Run the tracker:

    ```bash
    npm start
    ```

    The program will continuously monitor Solana transactions for liquidity pool creation and send notifications to the specified Telegram channel.

## Configuration

Edit the `.env` file to configure the following settings:

- `RAYDIUM_PUBLIC_KEY`: Public key of the Raydium DEX program.
- `SESSION_HASH`: Unique session hash for identifying the tracker session.
- `QUICKNODE_URL`: QuickNode URL for Solana RPC.
- `TELEGRAM_BOT_TOKEN`: Telegram Bot API token.
- `TELEGRAM_CHAT_ID`: Telegram channel or chat ID.

## Contributing

If you'd like to contribute to this project, please follow the standard GitHub fork and pull request workflow.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Solana
- Raydium DEX
- QuickNode

