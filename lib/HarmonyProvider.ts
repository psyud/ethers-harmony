import { ethers } from 'ethers'
import { Logger } from "@ethersproject/logger"
import { version } from "@ethersproject/providers/lib/_version"
import { Network } from '@ethersproject/networks';
import { defineReadOnly } from '@ethersproject/properties';
import RpcRequestFactory, { RpcRequest } from './RpcRequestFactory'
import { ConnectionInfo, fetchJson } from '@ethersproject/web';
const logger = new Logger(version)
const factory = new RpcRequestFactory()

export default class HarmonyProvider extends ethers.providers.BaseProvider {
    readonly connection!: ConnectionInfo;
    private url: string

    constructor(network: string){
        super('any');

        switch(network){
            // TODO Don't hardcode these
            case 'mainnet':
                this.url = 'https://api.s0.t.hmny.io';
                break
            case 'testnet':
                this.url = 'https://api.s0.b.hmny.io';
                break
            case 'localnet':
                this.url = 'http://localhost:9500';
                break
            default:
                throw new Error('Unknown network');
        }

        defineReadOnly(this, "connection", Object.freeze({
            url: this.url
        }))
    }

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
}

function getResult(payload: { error?: { code?: number, data?: any, message?: string }, result?: any }): any {
    if (payload.error) {
        const error: any = new Error(payload.error.message);
        error.code = payload.error.code;
        error.data = payload.error.data;
        throw error;
    }

    return payload.result.toLocaleString('fullwide', { useGrouping: false });
}