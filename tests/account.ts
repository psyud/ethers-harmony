import assert from 'assert';
import { StakingTnxType } from '../lib/enums/StakingTnxType';
import HarmonyProvider from "../lib/HarmonyProvider"

const provider: HarmonyProvider = new HarmonyProvider('testnet');
const walletAddress = '0xa4b0a1b4e15e9d2a99e4d3d9ab1267dc02654b98';

describe('Account', () => {
    it('getBalance', async () => {
        const result = await provider.getBalance(walletAddress);
        assert(result !== null);
    })

    it('getBalanceByBlockNumber', async () => {
        const result = await provider.getBalanceByBlockNumber(walletAddress, 0);
        assert(result !== null);
    })

    it('getStakingTransactionsCount', async () => {
        const result = await provider.getStakingTransactionsCount(walletAddress, StakingTnxType.ALL);
        assert(result !== null);
    })

    it('getStakingTransactionsHistory', async () => {
        const result = await provider.getStakingTransactionsHistory(walletAddress);
        assert(result !== null);
    })

    it('getTransactionsCount', async () => {
        const result = await provider.getTransactionsCount(walletAddress, StakingTnxType.ALL);
        assert(result !== null);
    })

    it('getTransactionsHistory', async () => {
        const result = await provider.getTransactionsHistory(walletAddress);
        assert(result !== null);
    })

})