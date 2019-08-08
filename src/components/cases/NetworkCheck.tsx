import React from 'react';
import { CaseCard } from '../CaseCard/CaseCard';

const TESTING_NETWORK_CODE = 'T';

export class NetworkCheck extends React.Component<IProps> {
  public readonly state = {
    networkCode: undefined
  };

  public onClear() {
    const { onLogMessage } = this.props;
    this.setState({ networkCode: undefined });
    onLogMessage('');
  }

  private getPublicState() {
    const { onLogMessage, keeperApi } = this.props;

    keeperApi.getPublicState().then((publicState: any) => {
      onLogMessage(JSON.stringify(publicState, null, '\t'));

      this.setState({ networkCode: publicState.account.networkCode });
    });
  }

  public render() {
    const { networkCode: currentNetwork } = this.state;
    return (
      <CaseCard
        title='Кипер авторизован, активирован аккаунт другой сети'
        text='Проверка сети, добавить аккаунт из сети testnet'
        value={`Текущая сеть: ${this.state.networkCode}`}
        passed={
          currentNetwork === undefined
            ? undefined
            : currentNetwork === TESTING_NETWORK_CODE
        }
        onCheck={() => this.getPublicState()}
        onClear={() => this.onClear()}
      />
    );
  }
}

interface IProps {
  keeperApi: any;
  onLogMessage: any;
}
