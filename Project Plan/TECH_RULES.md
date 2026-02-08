# TECH RULES & STACK DEFINITION
## TERRA AI - Decentralized Climate Action Platform

> **⚠️ CANONICAL REFERENCE:** This document is the single source of truth for all development. Any AI-generated code MUST adhere to these specifications.

**Version:** 1.0 | **Last Updated:** February 2026

---

## 🎯 Project Overview

| Attribute | Value |
|-----------|-------|
| **App Name** | TERRA AI |
| **Type** | Decentralized Application (dApp) |
| **Core Flow** | User uploads eco-action photo → AI verifies → Smart Contract mints tokens → Dashboard tracks impact |

---

## 1. Frontend Framework

### Core Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | `14.x` (App Router) | React framework |
| **TypeScript** | `5.x` | Type safety |
| **React** | `18.x` | UI library |

### 🚨 Strict Rules

```
✅ MUST use App Router (not Pages Router)
✅ MUST use `src/` directory structure
✅ MUST use TypeScript for ALL files (.ts, .tsx)
❌ NO JavaScript files (.js, .jsx)
❌ NO Pages Router patterns
```

### Directory Structure (ENFORCED)

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Route groups for auth pages
│   ├── dashboard/         # Protected routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Primitive components (Button, Input, Card)
│   └── features/         # Feature-specific components
├── lib/                   # Utility functions & configs
│   ├── supabase.ts       # Supabase client
│   ├── web3.ts           # Blockchain utilities
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript interfaces & types
├── stores/               # Zustand stores (if used)
└── constants/            # App constants & configs
```

### Styling

| Technology | Version | Usage |
|------------|---------|-------|
| **Tailwind CSS** | `3.4.x` | Primary styling |
| **tailwind-merge** | `latest` | Class merging |
| **clsx** | `latest` | Conditional classes |

```typescript
// ✅ CORRECT: Use utility classes
<button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg">

// ❌ WRONG: No external CSS files (except globals.css)
import styles from './Button.module.css'

// ✅ CORRECT: Use cn() helper for conditional classes
import { cn } from '@/lib/utils'
<div className={cn("base-class", isActive && "active-class")}>
```

### Icons

| Library | Version | Import Pattern |
|---------|---------|----------------|
| **lucide-react** | `latest` | Named imports only |

```typescript
// ✅ CORRECT
import { Leaf, Sun, Wallet } from 'lucide-react'

// ❌ WRONG: No other icon libraries
import { FaLeaf } from 'react-icons/fa'
```

### State Management

| Scope | Solution |
|-------|----------|
| **Simple Global** | React Context |
| **Complex Global** | Zustand |
| **Server State** | TanStack Query (optional) |

```typescript
// Zustand store pattern
// src/stores/userStore.ts
import { create } from 'zustand'

interface UserStore {
  address: string | null
  setAddress: (address: string) => void
}

export const useUserStore = create<UserStore>((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
}))
```

---

## 2. Backend & Database

### Core Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | Cloud/Self-hosted | BaaS (Auth, DB, Storage) |
| **supabase-js** | `2.x` | Client SDK |
| **PostgreSQL** | `15.x` (via Supabase) | Database |

### 🚨 Strict Rules

```
✅ MUST use supabase-js v2 (not v1)
✅ MUST use Row Level Security (RLS) for all tables
✅ MUST validate all inputs before database operations
❌ NO direct database connections (use Supabase client only)
❌ NO storing sensitive data in public columns
```

### Database Naming Convention

| Element | Convention | Example |
|---------|------------|---------|
| **Tables** | PascalCase | `Users`, `EcoActions`, `TokenRewards` |
| **Columns** | snake_case | `user_id`, `created_at`, `verification_status` |
| **Foreign Keys** | `{table}_id` | `user_id`, `action_id` |
| **Indexes** | `idx_{table}_{column}` | `idx_users_wallet_address` |

### Database Schema

```sql
-- Users Table
CREATE TABLE Users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT UNIQUE NOT NULL,
  display_name TEXT,
  total_tokens DECIMAL DEFAULT 0,
  total_co2_offset DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- EcoActions Table
CREATE TABLE EcoActions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
  action_type TEXT NOT NULL, -- 'tree_plant', 'solar_panel', 'recycling', etc.
  image_url TEXT NOT NULL,
  location JSONB, -- { lat, lng, address }
  ai_verification_score DECIMAL,
  ai_detected_objects JSONB, -- [{ label, confidence }]
  verification_status TEXT DEFAULT 'pending', -- 'pending', 'verified', 'rejected'
  blockchain_tx_hash TEXT,
  tokens_earned DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TokenRewards Table
CREATE TABLE TokenRewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES Users(id) ON DELETE CASCADE,
  action_id UUID REFERENCES EcoActions(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  tx_hash TEXT NOT NULL,
  minted_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Supabase Client Setup

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side client (for API routes)
export const createServerClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
```

### Storage Rules

| Bucket | Access | Max Size | Allowed Types |
|--------|--------|----------|---------------|
| `eco-actions` | Authenticated users | 10MB | `image/jpeg`, `image/png`, `image/webp` |
| `profiles` | Authenticated users | 2MB | `image/jpeg`, `image/png` |

---

## 3. AI & Computer Vision

### Core Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **ONNX Runtime Web** | `1.17.x` | Model inference |
| **YOLOv8** | Nano/Small (quantized) | Object detection |

### 🚨 Strict Rules

```
✅ AI verification MUST complete BEFORE any blockchain transaction
✅ MUST use quantized models for web performance
✅ MUST return confidence scores with all detections
✅ Minimum confidence threshold: 0.75 (75%)
❌ NO server-side inference for MVP (browser-only)
❌ NO unverified actions can trigger token minting
```

### Detectable Objects

| Label | Token Reward | Min Confidence |
|-------|--------------|----------------|
| `tree` | 10 TERRA | 0.80 |
| `solar_panel` | 25 TERRA | 0.85 |
| `ev_charger` | 15 TERRA | 0.80 |
| `recycling_bin` | 5 TERRA | 0.75 |
| `bicycle` | 3 TERRA | 0.75 |
| `reusable_bag` | 2 TERRA | 0.75 |

### AI Verification Flow

```typescript
// src/lib/ai/verify.ts
import * as ort from 'onnxruntime-web'

interface DetectionResult {
  label: string
  confidence: number
  boundingBox: { x: number; y: number; width: number; height: number }
}

interface VerificationResult {
  isVerified: boolean
  score: number
  detections: DetectionResult[]
  tokensEarned: number
}

export async function verifyEcoAction(
  imageData: ImageData
): Promise<VerificationResult> {
  // 1. Run YOLO inference
  // 2. Filter by confidence threshold
  // 3. Calculate token reward
  // 4. Return verification result
}
```

### Model Files Location

```
public/
└── models/
    ├── yolov8n-eco.onnx      # Quantized YOLOv8 nano
    └── yolov8n-eco.json      # Labels & config
```

---

## 4. Blockchain & Web3

### Network Configuration

| Network | Chain ID | RPC URL | Explorer |
|---------|----------|---------|----------|
| **Polygon Amoy (Testnet)** | `80002` | `https://rpc-amoy.polygon.technology/` | `https://amoy.polygonscan.com/` |
| **Polygon Mainnet** | `137` | `https://polygon-rpc.com/` | `https://polygonscan.com/` |

> ⚠️ **Mumbai testnet is DEPRECATED.** Use Amoy for all testnet development.

### Core Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **viem** | `2.x` | Ethereum interactions |
| **wagmi** | `2.x` | React hooks for Ethereum |
| **RainbowKit** | `2.x` | Wallet connection UI |
| **Solidity** | `^0.8.20` | Smart contracts |
| **Hardhat** | `2.x` | Contract development |

### 🚨 Strict Rules

```
✅ MUST use viem (not ethers.js) for consistency
✅ MUST verify AI result BEFORE calling mint function
✅ MUST handle all transaction states (pending, success, error)
✅ MUST store tx_hash in database after successful mint
❌ NO hardcoded private keys in frontend
❌ NO contract calls without wallet connection
❌ NO minting without prior AI verification
```

### Smart Contract Interface

```solidity
// contracts/TerraToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TerraToken is ERC20, Ownable {
    mapping(bytes32 => bool) public usedVerificationHashes;
    
    event ActionRewarded(
        address indexed user,
        uint256 amount,
        bytes32 verificationHash,
        string actionType
    );
    
    constructor() ERC20("TERRA", "TERRA") Ownable(msg.sender) {}
    
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
```

### Web3 Client Setup

```typescript
// src/lib/web3.ts
import { createConfig, http } from 'wagmi'
import { polygonAmoy, polygon } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'TERRA AI',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID!,
  chains: [polygonAmoy, polygon],
  transports: {
    [polygonAmoy.id]: http(),
    [polygon.id]: http(),
  },
})

// Contract addresses
export const CONTRACTS = {
  TERRA_TOKEN: {
    [polygonAmoy.id]: '0x...' as `0x${string}`,
    [polygon.id]: '0x...' as `0x${string}`,
  },
} as const
```

### Transaction Flow

```
1. User uploads image
2. AI verifies image → returns { isVerified, score, tokensEarned }
3. IF verified:
   a. Generate verificationHash = keccak256(userId + actionId + timestamp)
   b. Call rewardAction(user, tokensEarned, verificationHash, actionType)
   c. Wait for tx confirmation
   d. Store tx_hash in EcoActions table
   e. Update user's total_tokens
4. Show success/error toast
```

---

## 5. Coding Standards

### TypeScript Rules

```typescript
// ❌ NEVER use `any`
const data: any = response

// ✅ ALWAYS define types
interface EcoAction {
  id: string
  userId: string
  actionType: 'tree' | 'solar_panel' | 'recycling'
  verificationStatus: 'pending' | 'verified' | 'rejected'
  tokensEarned: number
}

const data: EcoAction = response
```

### Types Directory

```typescript
// src/types/index.ts
export interface User {
  id: string
  walletAddress: string
  displayName: string | null
  totalTokens: number
  totalCo2Offset: number
}

export interface EcoAction {
  id: string
  userId: string
  actionType: string
  imageUrl: string
  location: { lat: number; lng: number; address?: string } | null
  aiVerificationScore: number | null
  aiDetectedObjects: { label: string; confidence: number }[] | null
  verificationStatus: 'pending' | 'verified' | 'rejected'
  blockchainTxHash: string | null
  tokensEarned: number
  createdAt: string
}

export interface VerificationResult {
  isVerified: boolean
  score: number
  detections: Detection[]
  tokensEarned: number
}

export interface Detection {
  label: string
  confidence: number
  boundingBox: BoundingBox
}
```

### Environment Variables

| Variable | Scope | Usage |
|----------|-------|-------|
| `NEXT_PUBLIC_*` | Frontend (exposed) | Browser-accessible config |
| `*` (without prefix) | Backend only | Secrets, API keys |

```bash
# .env.local (NEVER commit this file)

# Public (Frontend)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
NEXT_PUBLIC_WALLET_CONNECT_ID=xxx
NEXT_PUBLIC_CHAIN_ID=80002

# Private (Backend only)
SUPABASE_SERVICE_ROLE_KEY=eyJxxx
CONTRACT_OWNER_PRIVATE_KEY=0xabc...
```

```typescript
// ✅ CORRECT: Access in code
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!

// ❌ WRONG: Hardcoded values
const supabaseUrl = 'https://xxx.supabase.co'
```

### Error Handling

| Library | Version | Usage |
|---------|---------|-------|
| **sonner** | `latest` | Toast notifications |

```typescript
// ✅ CORRECT: All async calls wrapped in try/catch
import { toast } from 'sonner'

async function submitEcoAction(imageFile: File) {
  try {
    // 1. Upload image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('eco-actions')
      .upload(`${userId}/${Date.now()}.jpg`, imageFile)
    
    if (uploadError) throw uploadError

    // 2. Verify with AI
    const verification = await verifyEcoAction(imageFile)
    
    if (!verification.isVerified) {
      toast.error('Verification failed. Please try a clearer image.')
      return
    }

    // 3. Mint tokens
    const txHash = await mintTokens(verification.tokensEarned)
    
    toast.success(`Earned ${verification.tokensEarned} TERRA tokens! 🌱`)
    
  } catch (error) {
    console.error('Submit action error:', error)
    toast.error('Something went wrong. Please try again.')
  }
}
```

### Component Patterns

```typescript
// src/components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-green-500 text-white hover:bg-green-600': variant === 'primary',
            'bg-slate-800 text-white hover:bg-slate-700': variant === 'secondary',
            'bg-transparent hover:bg-slate-800': variant === 'ghost',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

---

## 6. File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `EcoActionCard.tsx` |
| **Hooks** | camelCase with `use` prefix | `useWallet.ts` |
| **Utils/Lib** | camelCase | `formatTokens.ts` |
| **Types** | camelCase | `ecoAction.ts` |
| **Constants** | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.ts` |
| **Pages (App Router)** | lowercase | `page.tsx`, `layout.tsx` |

---

## 7. Git Commit Convention

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, test, chore
Scope: ui, api, web3, ai, db, config

Examples:
feat(ui): add eco-action submission form
fix(web3): handle wallet disconnect edge case
docs(readme): update setup instructions
```

---

## 8. Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    TERRA AI TECH STACK                      │
├─────────────────────────────────────────────────────────────┤
│ FRONTEND     │ Next.js 14 + TypeScript + Tailwind          │
│ STATE        │ Zustand / React Context                      │
│ ICONS        │ lucide-react                                 │
├─────────────────────────────────────────────────────────────┤
│ BACKEND      │ Supabase (Auth + DB + Storage)              │
│ DATABASE     │ PostgreSQL (Tables: PascalCase)             │
│ COLUMNS      │ snake_case                                   │
├─────────────────────────────────────────────────────────────┤
│ AI           │ ONNX Runtime Web + YOLOv8 (quantized)       │
│ MIN CONF     │ 0.75 (75%)                                   │
│ FLOW         │ AI verify → THEN → Blockchain               │
├─────────────────────────────────────────────────────────────┤
│ BLOCKCHAIN   │ Polygon Amoy (Testnet) / Polygon Mainnet    │
│ WEB3 LIB     │ viem + wagmi                                │
│ WALLET UI    │ RainbowKit                                  │
│ CONTRACTS    │ Solidity ^0.8.20                            │
├─────────────────────────────────────────────────────────────┤
│ TOASTS       │ sonner                                       │
│ NO `any`     │ ✓ ENFORCED                                  │
│ ENV VARS     │ NEXT_PUBLIC_* for frontend                  │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist Before Coding

- [ ] Using Next.js App Router (not Pages)
- [ ] All files are TypeScript (.ts/.tsx)
- [ ] No `any` types
- [ ] Components in `src/components/`
- [ ] Types in `src/types/`
- [ ] Environment variables properly prefixed
- [ ] All async calls in try/catch
- [ ] AI verification before blockchain calls
- [ ] Using viem (not ethers.js)
- [ ] Using Polygon Amoy (not Mumbai)

---

**Document Status:** ✅ APPROVED FOR DEVELOPMENT  
**Maintainer:** TERRA AI Development Team
