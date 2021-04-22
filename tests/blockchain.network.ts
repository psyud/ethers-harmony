import assert from 'assert';
import HarmonyProvider from "../lib/HarmonyProvider"

const provider: HarmonyProvider = new HarmonyProvider('testnet');

describe('Blockchain', () => {
    describe('Network', () => {
        it('blockNumber', async () => {
            const result = await provider.getBlockNumber();
            assert(typeof result === 'number');
            assert(result > 0);
        })

        it('getCirculatingSupply', async () => {
            const result = await provider.getCirculatingSupply();
            assert(typeof result === 'number');
            assert(result > 0);
        })

        it('getEpoch', async () => {
            const result = await provider.getEpoch();
            assert(typeof result === 'number');
            assert(result > 0);
        })

        it('getLastCrossLinks', async () => {
            const result = await provider.getLastCrossLinks();
            assert(result.length > 0 );
        })

        it('getLeader', async () => {
            const result = await provider.getLeader();
            assert(typeof result === 'string');
            assert(result.startsWith('one'));
        })

        it('gasPrice', async () => {
            const result = await provider.getGasPrice();
            assert(result.constructor.name === 'BigNumber');
        })

        it('getShardingStructure', async () => {
            const result = await provider.getShardingStructure();
            assert(result.length > 0);
        })

        it('getTotalSupply', async () => {
            const result = await provider.getTotalSupply();
            assert(typeof result === 'number');
            assert(result > 0);
        })

        it('getValidators', async () => {
            const result = await provider.getValidators(1);
            assert(result.validators.length > 0);
        })

        it('getValidatorKeys', async () => {
            const result = await provider.getValidatorKeys(1);
            assert(result.length > 0);
        })
    })
})