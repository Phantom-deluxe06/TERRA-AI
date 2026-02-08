# TERRA AI - Development Todo

> **📋 Master Task List** | Generated from PRD, Design Document, and Tech Rules  
> **Last Updated:** February 2026

---

## Legend

- `[ ]` Not started
- `[/]` In progress
- `[x]` Completed
- `[!]` Blocked/Needs attention
- `Priority:` 🔴 Critical | 🟡 High | 🟢 Medium | ⚪ Low

---

## Phase 1: Foundation (Weeks 1-4)

### 1.1 Project Setup 🔴

- [ ] **Initialize Next.js 14 project with App Router**
  - [ ] Run `npx create-next-app@latest terra-ai --typescript --tailwind --app --src-dir`
  - [ ] Configure `tsconfig.json` with strict mode
  - [ ] Set up path aliases (`@/` for `src/`)
  - [ ] Create directory structure per TECH_RULES.md

- [ ] **Configure Tailwind CSS**
  - [ ] Set up design tokens from Design Document (colors, spacing, typography)
  - [ ] Add custom color palette (Earth Green, Ocean Blue, Carbon Dark)
  - [ ] Configure `tailwind.config.ts` with brand fonts (Inter, JetBrains Mono)
  - [ ] Create `globals.css` with base styles

- [ ] **Install core dependencies**
  - [ ] `lucide-react` for icons
  - [ ] `zustand` for state management
  - [ ] `sonner` for toast notifications
  - [ ] `clsx` + `tailwind-merge` for class utilities

- [ ] **Set up environment configuration**
  - [ ] Create `.env.local` template
  - [ ] Create `.env.example` for documentation
  - [ ] Configure `next.config.js` for env validation

---

### 1.2 Supabase Backend Setup 🔴

- [ ] **Create Supabase project**
  - [ ] Set up project in Supabase Dashboard
  - [ ] Configure auth providers (wallet-based if possible)
  - [ ] Enable Row Level Security

- [ ] **Database schema implementation**
  - [ ] Create `Users` table with wallet_address, display_name, total_tokens
  - [ ] Create `EcoActions` table with all fields from TECH_RULES.md
  - [ ] Create `TokenRewards` table for minting history
  - [ ] Set up RLS policies for each table
  - [ ] Add database indexes for performance

- [ ] **Storage buckets**
  - [ ] Create `eco-actions` bucket (10MB limit, image types only)
  - [ ] Create `profiles` bucket (2MB limit)
  - [ ] Configure storage policies

- [ ] **Generate TypeScript types**
  - [ ] Run `supabase gen types typescript`
  - [ ] Place in `src/types/supabase.ts`

---

### 1.3 Web3 Integration 🔴

- [ ] **Configure wagmi + viem**
  - [ ] Install `wagmi`, `viem`, `@rainbow-me/rainbowkit`
  - [ ] Configure Polygon Amoy testnet
  - [ ] Set up WalletConnect project ID
  - [ ] Create `src/lib/web3.ts` configuration

- [ ] **RainbowKit wallet UI**
  - [ ] Wrap app with RainbowKitProvider
  - [ ] Customize theme to match design system
  - [ ] Add ConnectButton to navigation

- [ ] **Smart contract development**
  - [ ] Initialize Hardhat project in `contracts/` folder
  - [ ] Write TerraToken.sol (ERC-20 with rewardAction function)
  - [ ] Write unit tests for contract
  - [ ] Deploy to Polygon Amoy testnet
  - [ ] Verify contract on Polygonscan

---

## Phase 2: Core UI Components (Weeks 3-5)

### 2.1 Design System Components 🟡

- [ ] **Primitive UI components** (`src/components/ui/`)
  - [ ] `Button.tsx` - Primary, Secondary, Ghost variants
  - [ ] `Input.tsx` - Text input with label and error states
  - [ ] `Card.tsx` - Base card with header, content, footer slots
  - [ ] `Badge.tsx` - Status badges (Verified, Pending, Failed)
  - [ ] `Modal.tsx` - Dialog component with animations
  - [ ] `Skeleton.tsx` - Loading placeholders
  - [ ] `Avatar.tsx` - User wallet avatar
  - [ ] `Progress.tsx` - Progress bar/circle

- [ ] **Layout components**
  - [ ] `Navbar.tsx` - Top navigation with wallet connect
  - [ ] `Sidebar.tsx` - Dashboard sidebar navigation
  - [ ] `PageLayout.tsx` - Consistent page wrapper
  - [ ] `Container.tsx` - Max-width container

- [ ] **Feedback components**
  - [ ] Configure Sonner toast provider
  - [ ] Create toast utility functions (`toast.success`, `toast.error`)
  - [ ] `LoadingSpinner.tsx` - Animated loader

---

### 2.2 Landing Page 🟡

- [ ] **Hero section**
  - [ ] Gradient headline "TERRA AI"
  - [ ] Tagline and call-to-action buttons
  - [ ] Animated stats counter (actions verified, CO₂ offset)
  - [ ] 3D Earth globe or eco illustration

- [ ] **Features section**
  - [ ] Three-step process cards (Upload → Verify → Earn)
  - [ ] Icon-based feature highlights
  - [ ] Smooth scroll animations

- [ ] **How it works**
  - [ ] Step-by-step visual flow
  - [ ] Interactive demo preview

- [ ] **Footer**
  - [ ] Links, social icons, copyright

---

### 2.3 Authentication Flow 🟡

- [ ] **Wallet connection**
  - [ ] "Connect Wallet" CTA on landing page
  - [ ] RainbowKit modal integration
  - [ ] Handle connection/disconnection states

- [ ] **User profile creation**
  - [ ] Auto-create Supabase user on first wallet connect
  - [ ] Optional display name setup
  - [ ] Store wallet address in database

- [ ] **Protected routes**
  - [ ] Create auth middleware for dashboard routes
  - [ ] Redirect unauthenticated users to landing page
  - [ ] Show loading state during auth check

---

## Phase 3: AI Verification Engine (Weeks 5-7)

### 3.1 Model Integration 🔴

- [ ] **Prepare YOLOv8 model**
  - [ ] Download/train YOLOv8 nano for eco-objects
  - [ ] Export to ONNX format
  - [ ] Quantize for web performance
  - [ ] Place in `public/models/`

- [ ] **ONNX Runtime setup**
  - [ ] Install `onnxruntime-web`
  - [ ] Create model loader utility
  - [ ] Handle WebGL/WASM backends
  - [ ] Add loading progress indicator

- [ ] **Inference pipeline**
  - [ ] Image preprocessing (resize, normalize)
  - [ ] Run object detection
  - [ ] Post-process outputs (NMS, confidence filtering)
  - [ ] Return structured DetectionResult[]

---

### 3.2 Verification UI 🟡

- [ ] **Image upload component**
  - [ ] Drag-and-drop zone
  - [ ] File type validation (jpg, png, webp)
  - [ ] Image preview with crop/rotate
  - [ ] Size limit feedback (max 10MB)

- [ ] **Verification progress**
  - [ ] Step indicator (Uploading → Analyzing → Verifying)
  - [ ] AI progress bar
  - [ ] Animated scanning effect on image

- [ ] **Results display**
  - [ ] Bounding boxes overlay on image
  - [ ] Detected objects list with confidence %
  - [ ] Pass/Fail verdict with explanation
  - [ ] Token reward preview

---

### 3.3 Action Submission Flow 🟡

- [ ] **Multi-step form** (`src/app/submit/`)
  - [ ] Step 1: Select action type (tree, solar, recycling, etc.)
  - [ ] Step 2: Upload photo + add location (optional GPS)
  - [ ] Step 3: AI verification (automatic)
  - [ ] Step 4: Review & confirm

- [ ] **Form validation**
  - [ ] Required field checks
  - [ ] Image quality hints
  - [ ] Location picker integration

- [ ] **Submission logic**
  - [ ] Upload image to Supabase storage
  - [ ] Trigger AI verification
  - [ ] Save action to database (pending status)
  - [ ] Toast notification on completion

---

## Phase 4: Blockchain Rewards (Weeks 7-9)

### 4.1 Token Minting 🔴

- [ ] **Minting flow**
  - [ ] Generate verification hash (userId + actionId + timestamp)
  - [ ] Call smart contract `rewardAction()`
  - [ ] Handle transaction signing via wallet
  - [ ] Wait for confirmation (poll or websocket)

- [ ] **Transaction UI**
  - [ ] Pending transaction modal
  - [ ] Transaction hash display
  - [ ] Link to Polygonscan
  - [ ] Success celebration animation

- [ ] **Database updates**
  - [ ] Store tx_hash in EcoActions table
  - [ ] Update TokenRewards table
  - [ ] Increment user's total_tokens

---

### 4.2 Wallet Integration 🟡

- [ ] **Token balance display**
  - [ ] Fetch TERRA token balance
  - [ ] Show in navbar and dashboard
  - [ ] Auto-refresh on new mints

- [ ] **Transaction history**
  - [ ] List all user's token rewards
  - [ ] Show action type, amount, date
  - [ ] Link each to blockchain explorer

---

## Phase 5: Dashboard (Weeks 8-10)

### 5.1 Main Dashboard 🟡

- [ ] **Overview metrics**
  - [ ] Total TERRA tokens earned
  - [ ] Total CO₂e offset (calculated)
  - [ ] Actions verified count
  - [ ] Streak/activity chart

- [ ] **Recent activity feed**
  - [ ] Last 5-10 verified actions
  - [ ] Quick action cards with thumbnails
  - [ ] Status badges (Verified, Pending, Failed)

- [ ] **Impact visualization**
  - [ ] CO₂ offset equivalents (trees, miles driven)
  - [ ] Progress towards personal goals
  - [ ] Animated counters

---

### 5.2 My Actions Page 🟡

- [ ] **Actions list/grid view**
  - [ ] Toggle between list and card views
  - [ ] Filter by status (All, Verified, Pending, Rejected)
  - [ ] Sort by date, tokens earned
  - [ ] Pagination or infinite scroll

- [ ] **Action detail modal/page**
  - [ ] Image with AI detection overlay
  - [ ] Verification details (confidence, objects)
  - [ ] Blockchain proof (tx hash, block number)
  - [ ] Share functionality

---

### 5.3 Profile & Settings 🟢

- [ ] **User profile**
  - [ ] Wallet address (truncated)
  - [ ] Display name (editable)
  - [ ] Profile avatar
  - [ ] Member since date

- [ ] **Settings page**
  - [ ] Notification preferences
  - [ ] Theme toggle (dark/light)
  - [ ] Connected wallet info
  - [ ] Disconnect wallet option

---

## Phase 6: Polish & Launch (Weeks 10-12)

### 6.1 Performance Optimization 🟢

- [ ] **Frontend performance**
  - [ ] Image optimization (next/image)
  - [ ] Code splitting by route
  - [ ] Lazy load AI model
  - [ ] Preload critical assets

- [ ] **SEO & Meta**
  - [ ] Add meta tags to all pages
  - [ ] Open Graph images
  - [ ] Sitemap generation
  - [ ] robots.txt

---

### 6.2 Testing 🟡

- [ ] **Unit tests**
  - [ ] Test AI verification functions
  - [ ] Test token calculation logic
  - [ ] Test Supabase helpers

- [ ] **E2E tests**
  - [ ] User registration flow
  - [ ] Action submission flow
  - [ ] Token claiming flow (testnet)

- [ ] **Manual QA**
  - [ ] Cross-browser testing
  - [ ] Mobile responsiveness
  - [ ] Wallet edge cases (disconnect, switch network)

---

### 6.3 Deployment 🟡

- [ ] **Vercel deployment**
  - [ ] Connect GitHub repo
  - [ ] Configure environment variables
  - [ ] Set up preview deployments
  - [ ] Custom domain (if applicable)

- [ ] **Smart contract mainnet**
  - [ ] Final security audit
  - [ ] Deploy to Polygon Mainnet
  - [ ] Update contract address in env
  - [ ] Verify on Polygonscan

- [ ] **Launch checklist**
  - [ ] Final content review
  - [ ] Test all flows on production
  - [ ] Monitoring & error tracking (Sentry)
  - [ ] Analytics setup

---

## 📊 Progress Tracker

| Phase | Status | Progress |
|-------|--------|----------|
| Phase 1: Foundation | Not Started | 0% |
| Phase 2: Core UI | Not Started | 0% |
| Phase 3: AI Engine | Not Started | 0% |
| Phase 4: Blockchain | Not Started | 0% |
| Phase 5: Dashboard | Not Started | 0% |
| Phase 6: Polish | Not Started | 0% |

---

## 🚀 Quick Start Commands

```bash
# Start development
npm run dev

# Run tests
npm run test

# Build for production
npm run build

# Deploy smart contracts (testnet)
cd contracts && npx hardhat run scripts/deploy.ts --network amoy
```

---

**Next Action:** Start with Phase 1.1 - Project Setup
