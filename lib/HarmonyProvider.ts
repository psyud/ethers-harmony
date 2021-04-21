import { BigNumber, ethers } from 'ethers'
import { Logger } from "@ethersproject/logger"
import { version } from "@ethersproject/providers/lib/_version"
import { Network } from '@ethersproject/networks';
import { defineReadOnly } from '@ethersproject/properties';
import RpcRequestFactory, { RpcRequest } from './RpcRequestFactory'
import { ConnectionInfo, fetchJson } from '@ethersproject/web';
import { resolveProperties } from 'ethers/lib/utils';
import { StakingTnxType } from './enums/StakingTnxType';
import { Method } from './enums/Method';
import { Order } from './enums/Order';
const logger = new Logger(version)
const factory = new RpcRequestFactory()

export default class HarmonyProvider extends ethers.providers.BaseProvider {
    readonly connection!: ConnectionInfo;

    constructor(network: string){
        super('any');

        let url: string;
        switch(network){
            // TODO Don't hardcode these
            case 'mainnet':
                url = 'https://api.s0.t.hmny.io';
                break
            case 'testnet':
                url = 'https://api.s0.b.hmny.io';
                break
            case 'localnet':
                url = 'http://localhost:9500';
                break
            default:
                throw new Error('Unknown network');
        }

        defineReadOnly(this, "connection", Object.freeze({
            url
        }))
    }

    // Accounts
    async getBalance(addressOrName: string | Promise<string>): Promise<BigNumber> {
        return super.getBalance(addressOrName);
    }

    async getBalanceByBlockNumber(address: string, blockNumber: number): Promise<BigNumber> {
        await this.getNetwork();
        const params = await resolveProperties({
            address: this._getAddress(address),
            blockNumber
        });

        return this.resolveNumericRequest(Method.getBalanceByBlockNumber, params);
        
    }

    async getStakingTransactionsCount(address: string, stakingTnxType: StakingTnxType): Promise<BigNumber> {
        await this.getNetwork();
        const params = await resolveProperties({
            address: this._getAddress(address),
            stakingTnxType
        })

        return this.resolveNumericRequest(Method.getStakingTransactionsCount, params);
    }

    async getStakingTransactionsHistory(address: string, pageIndex?: number, pageSize?: number, fullTx?: boolean, txType?: StakingTnxType, order?: Order): Promise<any> {
        await this.getNetwork();
        const params = await resolveProperties({
            address: this._getAddress(address),
            pageIndex,
            pageSize,
            fullTx,
            txType,
            order
        })

        return this.resolveAnyRequest(Method.getStakingTransactionsHistory, params);
    }

    async getTransactionsCount(address: string, stakingTnxType: StakingTnxType): Promise<BigNumber> {
        await this.getNetwork();
        const params = await resolveProperties({
            address: this._getAddress(address),
            stakingTnxType
        })

        return this.resolveNumericRequest(Method.getTransactionsCount, params);
    }

    async getTransactionsHistory(address: string, pageIndex?: number, pageSize?: number, fullTx?: boolean, txType?: StakingTnxType, order?: Order): Promise<any> {
        await this.getNetwork();
        const params = await resolveProperties({
            address: this._getAddress(address),
            pageIndex,
            pageSize,
            fullTx,
            txType,
            order
        })

        return this.resolveAnyRequest(Method.getTransactionsHistory, params);
    }

    // Utils 
    async detectNetwork(): Promise<Network> {
        return new Promise<Network>(function(resolve){
            resolve({
                name: 'harmony',
                chainId: 1666600000,
            } as Network)
        });
    }

    perform(method: string, params: any): Promise<any> {
        let request = factory.buildRequest(method, params);
        return this.sendRpcRequest(request);
    }

    sendRpcRequest(request: RpcRequest): Promise<any> {
        return fetchJson(this.connection, JSON.stringify(request), getResult);
    }

    async _getAddress(addressOrName: string | Promise<string>): Promise<string> {
        if(typeof(addressOrName) === 'string'){
            return Promise.resolve(addressOrName);
        }
        return await addressOrName;
    }

    async resolveAnyRequest(method: Method, params: any): Promise<any> {
        return await this.perform(method, params);
    }

    async resolveNumericRequest(method: Method, params: any): Promise<BigNumber> {
        const result = await this.perform(method, params);
        try {
            return BigNumber.from(result);
        } catch (error) {
            return logger.throwError("bad result from backend", Logger.errors.SERVER_ERROR, {
                method: "getBalance",
                params, result, error
            });
        }
    }
}

function getResult(payload: { error?: { code?: number, data?: any, message?: string }, result?: any }): any {
    if (payload.error) {
        const error: any = new Error(payload.error.message);
        error.code = payload.error.code;
        error.data = payload.error.data;
        throw error;
    }

    return typeof payload.result === 'number' ? payload.result.toLocaleString('fullwide', { useGrouping: false }) : payload.result;
}