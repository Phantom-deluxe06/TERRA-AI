// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TerraToken
 * @dev ERC20 token for TERRA AI rewards. 
 * Allows the owner (AI engine/Backend) to reward users for verified climate actions.
 */
contract TerraToken is ERC20, Ownable {
    mapping(bytes32 => bool) public usedVerificationHashes;
    
    event ActionRewarded(
        address indexed user,
        uint256 amount,
        bytes32 verificationHash,
        string actionType
    );
    
    constructor() ERC20("TERRA", "TERRA") Ownable(msg.sender) {}
    
    /**
     * @dev Rewards a user for a verified eco-action.
     * @param user The address of the user to reward.
     * @param amount The amount of TERRA tokens to mint.
     * @param verificationHash Unique hash for the verified action to prevent double-claiming.
     * @param actionType The type of action (e.g., 'tree', 'solar_panel').
     */
    function rewardAction(
        address user,
        uint256 amount,
        bytes32 verificationHash,
        string calldata actionType
    ) external onlyOwner {
        require(!usedVerificationHashes[verificationHash], "Already rewarded");
        usedVerificationHashes[verificationHash] = true;
        _mint(user, amount * 10**decimals());
        emit ActionRewarded(user, amount, verificationHash, actionType);
    }
}
