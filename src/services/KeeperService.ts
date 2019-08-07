export class KeeperService {
    private keeper: any;

    constructor(apiWavesKeeper: any) {
        this.keeper = apiWavesKeeper;
    }

    public async getPublicState(): Promise<void> {
        return this.keeper.publicState();
    }

    public signData() {
        const txData = {
            type: 4,
            data: {
                amount: {
                   assetId: "WAVES",
                   tokens: "1.567"
                },
                fee: {
                    assetId: "WAVES",
                    tokens: "0.001"
                },
                recipient: "test"
            }
        };
        
        return this.keeper.signTransaction(txData).then((data: object) => {
            //data - строка готовая для отсылки на ноду(сервер) сети Waves
            console.log(data);
            return true;
            
        }).catch((error: any) => { 
            //Обработка ошибок
            console.error(error);
            return false;
        });
    }
}