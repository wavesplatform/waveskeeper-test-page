import React from 'react';
import { CaseCard } from '../../CaseCard/CaseCard';
import { ICaseProps } from '../../../global';

const TESTING_NETWORK_CODE = 'T';
const TEST_MESSAGE = 'Кипер авторизован, активирован аккаунт другой сети';

export class NetworkCheck extends React.Component<ICaseProps> {
  public readonly state = {
    networkCode: undefined,
  };

  public onReset() {
    const { onLogMessage, onTestRun } = this.props;
    this.setState({ networkCode: undefined });
    onLogMessage('');
    onTestRun([]);
  }

  private getPublicState() {
    const { onLogMessage, keeperApi, onTestRun } = this.props;

    keeperApi
      .getPublicState()
      .then((publicState: any) => {
        onLogMessage(JSON.stringify(publicState, null, '\t'));
        onTestRun([
          {
            testText: TEST_MESSAGE,
            isPassed: true,
          },
        ]);
        this.setState({ networkCode: publicState.account.networkCode });
      })
      .catch((error: any) => {
        onLogMessage(JSON.stringify(error, null, '\t'));
        onTestRun([
          {
            testText: TEST_MESSAGE,
            isPassed: false,
          },
        ]);
      });
  }

  public render() {
    const { networkCode: currentNetwork } = this.state;
    return (
      <CaseCard
        title={TEST_MESSAGE}
        text='Проверка сети, добавить аккаунт из сети testnet'
        value={`Текущая сеть: ${this.state.networkCode}`}
        passed={
          currentNetwork === undefined
            ? undefined
            : currentNetwork === TESTING_NETWORK_CODE
        }
        onCheck={() => this.getPublicState()}
        onReset={() => this.onReset()}
      />
    );
  }
}
