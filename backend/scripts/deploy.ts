import { ethers } from "hardhat";

async function main() {
    console.log("Deploying TerraToken to Polygon Amoy...");

    const [deployer] = await ethers.getSigners();
    console.log("Deploying with account:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "MATIC");

    // Deploy TerraToken
    const TerraToken = await ethers.getContractFactory("TerraToken");
    const terraToken = await TerraToken.deploy();
    await terraToken.waitForDeployment();

    const contractAddress = await terraToken.getAddress();
    console.log("✅ TerraToken deployed to:", contractAddress);
    console.log("\nAdd this to your frontend .env.local:");
    console.log(`NEXT_PUBLIC_TERRA_TOKEN_ADDRESS=${contractAddress}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
