import { setupWallet } from './lib/wallet-setup.js';

async function main() {
  console.log('=== DPO2U — Check tDUST Balance ===\n');

  const ctx = await setupWallet();

  const balance = await ctx.wallet.getBalance();
  console.log(`  Coin Public Key: ${ctx.coinPublicKey}`);
  console.log(`  Balance: ${JSON.stringify(balance, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2)}`);

  await ctx.wallet.stop();
  console.log('\n=== Done ===');
}

main().catch((err) => {
  console.error('Failed:', err?.message || err);
  process.exit(1);
});
