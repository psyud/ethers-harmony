import { Method } from "./enums/Method";

export default class RpcRequestFactory {
    buildRequest(method: string, params: any): RpcRequest {
        let rpcMethod: string;
        let rpcParams: any[] = [];

        switch(method){
            case Method.getBalance:
                rpcMethod = `hmyv2_${Method.getBalance}`;
                rpcParams = [
                    params.address
                ]
                break;

            case Method.getBalanceByBlockNumber:
                rpcMethod = `hmyv2_${Method.getBalanceByBlockNumber}`;
                rpcParams = [
                    params.address,
                    params.blockNumber
                ]
                break;

            case Method.getStakingTransactionsCount:
                rpcMethod = `hmyv2_${Method.getStakingTransactionsCount}`;
                rpcParams = [
                    params.address,
                    params.stakingTnxType
                ];
                break;

            case Method.getStakingTransactionsHistory:
                rpcMethod = `hmyv2_${Method.getStakingTransactionsHistory}`;
                rpcParams = [
                    {
                        address: params.address,
                        pageIndex: params.pageIndex,
                        pageSize: params.pageSize,
                        fullTx: params.fullTx,
                        txType: params.txType,
                        order: params.order
                    }
                ]
                break;

            case Method.getTransactionsCount:
                rpcMethod = `hmyv2_${Method.getStakingTransactionsCount}`;
                rpcParams = [
                    params.address,
                    params.stakingTnxType
                ]
                break;

            case Method.getTransactionsHistory:
                rpcMethod = `hmyv2_${Method.getTransactionsHistory}`;
                rpcParams = [
                    {
                        address: params.address,
                        pageIndex: params.pageIndex,
                        pageSize: params.pageSize,
                        fullTx: params.fullTx,
                        txType: params.txType,
                        order: params.order
                    }
                ]
                break;

            default:
                throw new Error('Unsupported method');
        }

        return {
            jsonrpc: '2.0',
            id: 1,
            method: rpcMethod,
            params: rpcParams
        }
    }
}


export interface RpcRequest {
    jsonrpc: string,
    id: number,
    method: string,
    params: any
}