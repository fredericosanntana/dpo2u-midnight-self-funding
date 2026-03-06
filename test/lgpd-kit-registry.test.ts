import { describe, it } from 'node:test';
import * as assert from 'node:assert/strict';
import { createCircuitContext, dummyContractAddress } from '@midnight-ntwrk/compact-runtime';
import { Contract, ledger } from '../compact/build/lgpd-kit-registry/contract/index.js';

function padTo32Bytes(str: string): Uint8Array {
    const buf = Buffer.alloc(32);
    Buffer.from(str, 'utf-8').copy(buf, 0, 0, Math.min(str.length, 32));
    return new Uint8Array(buf);
}

function setup() {
    const contract = new Contract({});
    const coinPublicKey = '0'.repeat(64) as unknown as string;
    const { currentContractState, currentPrivateState } = contract.initialState({
        initialZswapLocalState: { coinPublicKey },
        initialPrivateState: new Map(),
    });
    const ctx = createCircuitContext(
        dummyContractAddress(),
        coinPublicKey,
        currentContractState.data,
        currentPrivateState ?? new Map(),
    );
    return { contract, ctx };
}

describe('LgpdKitRegistry', () => {
    it('should register an LGPD Kit with Hashes and Score', () => {
        const { contract, ctx } = setup();

        const companyIdStr = 'cnpj_12345678000199';
        const dpiaHashStr = 'bafybeig...dpiadoc';
        const policyHashStr = 'bafybeig...policydoc';
        const auditorDidStr = 'did:midnight:agent:02';

        const { context } = contract.circuits.registerLgpdKit(
            ctx,
            padTo32Bytes(companyIdStr),
            padTo32Bytes(dpiaHashStr),
            padTo32Bytes(policyHashStr),
            95n,
            padTo32Bytes(auditorDidStr)
        );

        const postLedger = ledger(context.currentQueryContext.state);

        // Ledger updates
        assert.equal(postLedger.kit_dpia_hashes.isEmpty(), false);
        assert.equal(postLedger.kit_policy_hashes.isEmpty(), false);
        assert.equal(postLedger.kit_privacy_scores.isEmpty(), false);
        assert.equal(postLedger.kit_auditor_dids.isEmpty(), false);
    });

    it('should reject score > 100', () => {
        const { contract, ctx } = setup();

        assert.throws(
            () => {
                contract.circuits.registerLgpdKit(
                    ctx,
                    padTo32Bytes('company'),
                    padTo32Bytes('dpia'),
                    padTo32Bytes('policy'),
                    101n,
                    padTo32Bytes('auditor')
                );
            },
            /Invalid compliance score/
        );
    });

    it('should return company score via query', () => {
        const { contract, ctx } = setup();

        const companyId = padTo32Bytes('score_test_company');

        const { context } = contract.circuits.registerLgpdKit(
            ctx, companyId, padTo32Bytes('dpia'), padTo32Bytes('policy'), 92n, padTo32Bytes('auditor')
        );

        const queryResult = contract.circuits.getCompanyPrivacyScore(context, companyId);
        assert.equal(queryResult.result, 92n);
    });

    it('should return 0 for unknown company score via query', () => {
        const { contract, ctx } = setup();
        const queryResult = contract.circuits.getCompanyPrivacyScore(ctx, padTo32Bytes('unknown'));
        assert.equal(queryResult.result, 0n);
    });
});
