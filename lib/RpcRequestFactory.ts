export default class RpcRequestFactory {
  

    buildRequest(method: string, params: any): RpcRequest {
        let rpcMethod: string;
        let rpcParams: string[] = [];

        switch(method){
            case 'getBalance':
                rpcMethod = 'hmyv2_getBalance';
                rpcParams = [
                    params.address
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