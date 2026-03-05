import * as fs from 'fs';
import * as path from 'path';
import { pipe } from 'effect';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { setupWallet, buildProviders } from './lib/wallet-setup.js';
import { padTo32Bytes } from '../src/types.js';
import type { DeployedAddresses } from '../src/types.js';

const ADDRESS_FILE = path.join(process.cwd(), '.deployed-addresses.json');
const NETWORK_ID = process.env.MIDNIGHT_NETWORK_ID || 'preprod';

// Contract name → build subdirectory mapping
const CONTRACT_BUILDS: Record<string, string> = {
  ComplianceRegistry: 'compliance-registry',
  PaymentGateway: 'payment-gateway',
  FeeDistributor: 'fee-distributor',
};

// Demo data
const COMPANY_ID = padTo32Bytes('dpo2u_demo_company');
const EXPERT_DID = padTo32Bytes('did:midnight:agent:expert-01');
const AUDITOR_DID = padTo32Bytes('did:midnight:agent:auditor-01');
const POLICY_CID = padTo32Bytes('bafybeigdyrzt5sfp7udm7hu76uh7y26nf');
const DEPOSIT_AMOUNT = 1000n;
const FEE_AMOUNT = 500n;
const EXPERT_SHARE = 200n;  // 40% of 500
const AUDITOR_SHARE = 300n; // 60% of 500
const COMPLIANCE_SCORE = 85n;

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`ASSERTION FAILED: ${message}`);
  console.log(`    PASS: ${message}`);
}

async function findContract(name: string, address: string, providers: any) {
  const buildDir = path.resolve(process.cwd(), 'compact', 'build', CONTRACT_BUILDS[name]);
  const { Contract } = await import(`../compact/build/${CONTRACT_BUILDS[name]}/contract/index.js`);

  const compiledContract = pipe(
    CompiledContract.make(name, Contract as any),
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets(buildDir),
  );

  return findDeployedContract(providers, {
    compiledContract: compiledContract as any,
    contractAddress: address,
  });
}

async function main() {
  console.log('=== DPO2U Self-Funding Protocol — E2E Demo Flow ===\n');

  if (!fs.existsSync(ADDRESS_FILE)) {
    console.error('No deployed addresses found. Run deploy first:');
    console.error('  npm run deploy:local   (or deploy:preprod)');
    process.exit(1);
  }

  const addresses: DeployedAddresses = JSON.parse(fs.readFileSync(ADDRESS_FILE, 'utf-8'));
  console.log('Deployed addresses:', addresses);

  setNetworkId(NETWORK_ID);

  console.log('\n[Setup] Initializing wallet and providers...');
  const ctx = await setupWallet();
  const providers = buildProviders(ctx);

  // Import ledger parsers for each contract
  const { ledger: parseGateway } = await import('../compact/build/payment-gateway/contract/index.js');
  const { ledger: parseDistributor } = await import('../compact/build/fee-distributor/contract/index.js');
  const { ledger: parseRegistry } = await import('../compact/build/compliance-registry/contract/index.js');

  // --- Step 1: Deposit to Treasury ---
  console.log(`\n[Step 1] depositToTreasury(${DEPOSIT_AMOUNT}) — Client pays $NIGHT`);
  const gateway = await findContract('PaymentGateway', addresses.PaymentGateway!, providers);
  const depositTx = await gateway.callTx.depositToTreasury(DEPOSIT_AMOUNT);
  console.log(`  TX Hash: ${depositTx.txHash}`);
  console.log(`  Status:  ${depositTx.status}`);

  const gatewayState = await (providers.publicDataProvider as any).queryContractState(addresses.PaymentGateway);
  if (gatewayState) {
    const state = parseGateway(gatewayState);
    console.log(`  Treasury balance: ${state.protocol_treasury}`);
    assert(state.protocol_treasury >= DEPOSIT_AMOUNT, `Treasury should have >= ${DEPOSIT_AMOUNT}`);
  }

  // --- Step 2: Distribute Compliance Fee ---
  console.log(`\n[Step 2] distributeComplianceFee(${FEE_AMOUNT}) — Protocol splits 40/60`);
  const distributor = await findContract('FeeDistributor', addresses.FeeDistributor!, providers);
  const feeTx = await distributor.callTx.distributeComplianceFee(
    COMPANY_ID,
    EXPERT_DID,
    AUDITOR_DID,
    FEE_AMOUNT,
    EXPERT_SHARE,
    AUDITOR_SHARE,
  );
  console.log(`  TX Hash: ${feeTx.txHash}`);
  console.log(`  Status:  ${feeTx.status}`);

  const feeState = await (providers.publicDataProvider as any).queryContractState(addresses.FeeDistributor);
  if (feeState) {
    const state = parseDistributor(feeState);
    console.log(`  Expert pool:  ${state.expert_fee_pool} (expected: ${EXPERT_SHARE})`);
    console.log(`  Auditor pool: ${state.auditor_fee_pool} (expected: ${AUDITOR_SHARE})`);
    assert(state.expert_fee_pool === EXPERT_SHARE, `Expert pool should be ${EXPERT_SHARE}`);
    assert(state.auditor_fee_pool === AUDITOR_SHARE, `Auditor pool should be ${AUDITOR_SHARE}`);
  }

  // --- Step 3: Register Compliance Attestation ---
  console.log(`\n[Step 3] registerAttestation(score=${COMPLIANCE_SCORE}) — Agent registers ZK proof`);
  const registry = await findContract('ComplianceRegistry', addresses.ComplianceRegistry!, providers);
  const attestTx = await registry.callTx.registerAttestation(
    COMPANY_ID,
    EXPERT_DID,
    POLICY_CID,
    COMPLIANCE_SCORE,
  );
  console.log(`  TX Hash: ${attestTx.txHash}`);
  console.log(`  Status:  ${attestTx.status}`);

  // --- Step 4: Query Final Ledger State ---
  console.log('\n[Step 4] Querying final ledger state...');
  const registryState = await (providers.publicDataProvider as any).queryContractState(addresses.ComplianceRegistry);
  if (registryState) {
    const state = parseRegistry(registryState);
    console.log(`  Attestation score: ${state.attestation_score}`);
    assert(state.attestation_score === COMPLIANCE_SCORE, `Score should be ${COMPLIANCE_SCORE}`);
    assert(state.attestation_scores.member(COMPANY_ID), 'Company should be registered');
  }

  console.log('\n=== E2E Demo Flow Complete ===');
  console.log('All 4 steps executed successfully:');
  console.log('  1. Treasury deposit ($NIGHT)');
  console.log('  2. Fee distribution (40/60 split verified on-chain)');
  console.log('  3. Compliance attestation (ZK proof)');
  console.log('  4. Ledger state verification');

  await ctx.wallet.stop();
}

main().catch((err) => {
  console.error('\nDemo failed:', err?.message || err);
  process.exit(1);
});
