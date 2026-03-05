# DPO2U Self-Funding Protocol

> **This project is built on the [Midnight Network](https://midnight.network/).**

An autonomous self-funding protocol for compliance agents on Midnight Network. Uses ZK proofs to privately manage fee distribution, treasury deposits, and regulatory attestations — without exposing sensitive company or agent data on-chain.

## Architecture

Three Compact smart contracts form a complete self-funding pipeline:

```
Client pays $NIGHT          Protocol splits fees         Agent registers ZK proof
     │                            │                            │
     ▼                            ▼                            ▼
┌──────────────┐         ┌──────────────────┐         ┌────────────────────┐
│ PaymentGateway│   ───►  │  FeeDistributor  │   ───►  │ ComplianceRegistry │
│              │         │                  │         │                    │
│ deposit()    │         │ distribute()     │         │ registerAttestation│
│ stake()      │         │ 40% expert       │         │ score, DID, CID   │
│ treasury bal │         │ 60% auditor      │         │ ZK privacy         │
└──────────────┘         └──────────────────┘         └────────────────────┘
```

### Contracts

| Contract | Purpose | Key Circuits |
|----------|---------|-------------|
| **PaymentGateway** | Treasury deposits and $NIGHT staking | `depositToTreasury`, `stakeTokens`, `getTreasuryBalance` |
| **FeeDistributor** | Split fees between expert (40%) and auditor (60%) agents | `distributeComplianceFee`, `getExpertPools`, `getAuditorPools` |
| **ComplianceRegistry** | Store compliance attestations with ZK privacy | `registerAttestation`, `getComplianceStatus` |

### Privacy Model

- Company IDs, agent DIDs, and policy CIDs are stored as `Bytes<32>` — opaque to observers
- Compliance scores are bounded (0-100) and validated on-chain via ZK assertions
- Fee split validation uses ZK constraints: `expert_share + auditor_share == total_amount`
- The `disclose()` primitive controls what gets revealed on the public ledger

## What Makes This Original

1. **Self-funding protocol** — No Midnight example does autonomous fee distribution between agents
2. **3-contract architecture** — PaymentGateway → FeeDistributor → ComplianceRegistry pipeline
3. **signRecipe workaround** — Original bug fix for wallet-sdk's `signRecipe` function (see `scripts/lib/wallet-setup.ts`)
4. **Compliance/LGPD use case** — ZK proofs applied to regulatory privacy (LGPD/GDPR)
5. **Agent DID integration** — Decentralized identities as `Bytes<32>` in ZK circuits

## Quick Start

### Prerequisites

- Node.js >= 20
- Docker (for local devnet)

### Install

```bash
npm install
```

### Run Tests (local, no network required)

```bash
npm test
```

Tests validate all 3 contracts using `@midnight-ntwrk/compact-runtime` locally:
- ComplianceRegistry: attestation registration, score bounds, query
- FeeDistributor: 40/60 split validation, zero-fee rejection, mismatched shares rejection
- PaymentGateway: deposit, stake, zero-amount rejection

### Deploy (Local Devnet)

```bash
# Start local Midnight node + indexer
npm run devnet:up

# Deploy all 3 contracts
npm run deploy:local

# Run E2E demo flow
npm run demo
```

### Deploy (PreProd)

```bash
cp .env.example .env
# Edit .env with your mnemonic/seed and PreProd endpoints

npm run deploy:preprod
npm run demo
```

### Demo Flow

The `demo-flow.ts` script executes the complete self-funding pipeline:

```
Step 1: depositToTreasury(1000)              → Client pays $NIGHT
Step 2: distributeComplianceFee(500, 200, 300) → Protocol splits 40/60
Step 3: registerAttestation(score=85)          → Agent registers ZK proof
Step 4: Query ledger state                     → Verify all mutations
```

## Project Structure

```
├── compact/                          # Compact smart contracts
│   ├── ComplianceRegistry.compact    # Attestation storage with ZK privacy
│   ├── FeeDistributor.compact        # Fee split with ZK constraints
│   ├── PaymentGateway.compact        # Treasury deposits and staking
│   └── build/                        # Compiled artifacts (per-contract)
│       ├── compliance-registry/
│       ├── fee-distributor/
│       └── payment-gateway/
├── scripts/
│   ├── deploy-all.ts                 # Deploy all 3 contracts sequentially
│   ├── demo-flow.ts                  # E2E demo: deposit → split → attest
│   ├── check-balance.ts              # Check tDUST wallet balance
│   └── lib/
│       ├── wallet-setup.ts           # Wallet init + signRecipe workaround
│       └── node-zk-config-provider.ts
├── test/
│   ├── compliance-registry.test.ts   # 4 tests
│   ├── fee-distributor.test.ts       # 4 tests
│   └── payment-gateway.test.ts       # 5 tests
├── docker-compose.yml                # Local devnet (midnight-node + indexer)
└── src/types.ts                      # Shared types and utilities
```

## Package Versions

| Package | Version | Minimum Required |
|---------|---------|-----------------|
| `@midnight-ntwrk/compact-runtime` | 0.14.0 | 0.14.0 |
| `@midnight-ntwrk/compact-js` | 2.4.0 | 2.4.0 |
| `@midnight-ntwrk/midnight-js-contracts` | 3.1.0 | 3.0.0 |
| `@midnight-ntwrk/wallet-sdk-facade` | 1.0.0 | 1.0.0 |
| `@midnight-ntwrk/midnight-js-indexer-public-data-provider` | 3.1.0 | 3.0.0 |
| `@midnight-ntwrk/ledger-v7` | 7.0.0 | N/A |

Compiled with Compact compiler v0.29.0.

## Scripts

| Command | Description |
|---------|-------------|
| `npm test` | Run all 13 unit tests locally |
| `npm run deploy:local` | Deploy to local devnet |
| `npm run deploy:preprod` | Deploy to Midnight PreProd |
| `npm run demo` | Run E2E demo flow |
| `npm run balance` | Check wallet tDUST balance |
| `npm run devnet:up` | Start local devnet (Docker) |
| `npm run devnet:down` | Stop local devnet |

## signRecipe Workaround

The wallet-sdk has a known bug where `signRecipe` uses a hardcoded `'pre-proof'` marker when cloning intents, but proven (`UnboundTransaction`) intents have `'proof'` data. Our `wallet-setup.ts` implements manual signing with correct proof markers:

```typescript
// Manual signing: use correct proof markers instead of buggy signRecipe
signTransactionIntents(recipe.baseTransaction, signFn, 'proof');
if (recipe.balancingTransaction) {
    signTransactionIntents(recipe.balancingTransaction, signFn, 'pre-proof');
}
```

See `scripts/lib/wallet-setup.ts` for the full implementation.

## License

MIT
