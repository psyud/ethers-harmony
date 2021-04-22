import { Method } from "./enums/Method";

export default class RpcRequestFactory {
    buildRequest(method: string, params: any): RpcRequest {
        let rpcParams: any[] = [];

        switch(method){
            // Blockchain/Network
            case Method.blockNumber:
            case Method.getCirculatingSupply:
            case Method.getEpoch:
            case Method.getLastCrossLinks:
            case Method.getLeader:
            case Method.gasPrice:
            case Method.getShardingStructure:
            case Method.getTotalSupply:
                break;
            case Method.getValidators:
            case Method.getValidatorKeys:
                rpcParams = [
                    params.epochNumber
                ]
                break;

            // Account
            case Method.getBalance:
                rpcParams = [
                    params.address
                ]
                break;

            case Method.getBalanceByBlockNumber:
                rpcParams = [
                    params.address,
                    params.blockNumber
                ]
                break;

            case Method.getStakingTransactionsCount:
                rpcParams = [
                    params.address,
                    params.stakingTnxType
                ];
                break;

            case Method.getStakingTransactionsHistory:
            case Method.getTransactionsHistory:
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
                rpcParams = [
                    params.address,
                    params.stakingTnxType
                ]
                break;

            default:
                throw new Error('Unsupported method');
        }

        return {
            jsonrpc: '2.0',
            id: 1,
            method: `hmyv2_${method}`,
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