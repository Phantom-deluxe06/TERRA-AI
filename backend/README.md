# TERRA-AI Backend

This folder contains the backend services for ClimateChain.

## Tech Stack
- Supabase (PostgreSQL, Auth, Storage)
- Polygon (Smart Contracts)
- Hardhat (Contract Development)

## Structure
```
backend/
├── contracts/         # Solidity smart contracts
│   ├── TerraToken.sol
│   └── VerificationNFT.sol
├── scripts/           # Deployment scripts
├── test/              # Contract tests
└── supabase/          # Database migrations & functions
```

## Getting Started
```bash
# Smart contracts
cd contracts
npm install
npx hardhat compile

# Deploy to testnet
npx hardhat run scripts/deploy.ts --network amoy
```
