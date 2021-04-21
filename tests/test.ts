import assert from 'assert';
import HarmonyProvider from "../lib/HarmonyProvider"

describe('HarmonyProvider', () => {
    it('Can get balance', async () => {
        let provider = new HarmonyProvider('testnet');
        const balance = await provider.getBalance('0xa4b0a1b4e15e9d2a99e4d3d9ab1267dc02654b98');
        assert(balance !== null);
    })
})