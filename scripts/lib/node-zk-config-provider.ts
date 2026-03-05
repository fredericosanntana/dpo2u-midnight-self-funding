import * as fs from 'fs';
import * as path from 'path';
import { ZKConfigProvider, createProverKey, createVerifierKey, createZKIR } from '@midnight-ntwrk/midnight-js-types';
import type { ProverKey, VerifierKey, ZKIR } from '@midnight-ntwrk/midnight-js-types';

const BUILD_DIR = path.resolve(process.cwd(), 'compact', 'build');

export class NodeZkConfigProvider<K extends string> extends ZKConfigProvider<K> {
    async getProverKey(circuitId: K): Promise<ProverKey> {
        const filePath = path.join(BUILD_DIR, 'keys', `${circuitId}.prover`);
        const buf = fs.readFileSync(filePath);
        return createProverKey(new Uint8Array(buf));
    }

    async getVerifierKey(circuitId: K): Promise<VerifierKey> {
        const filePath = path.join(BUILD_DIR, 'keys', `${circuitId}.verifier`);
        const buf = fs.readFileSync(filePath);
        return createVerifierKey(new Uint8Array(buf));
    }

    async getZKIR(circuitId: K): Promise<ZKIR> {
        const filePath = path.join(BUILD_DIR, 'zkir', `${circuitId}.zkir`);
        const buf = fs.readFileSync(filePath);
        return createZKIR(new Uint8Array(buf));
    }
}
