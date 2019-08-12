import React from 'react';
import { CaseCard } from '../CaseCard/CaseCard';
import { ITestStep, ICaseProps } from '../../global';

const TEST_MESSAGE = 'Кипер установлен, но не инициализирован паролем';

export class InstalledButLocked extends React.Component<ICaseProps> {
  private testSteps: Array<ITestStep> = [];

  public readonly state = {
    notInitialized: undefined,
  };

  public onClear() {
    const { onLogMessage } = this.props;
    this.setState({ notInitialized: undefined });
    onLogMessage('');
  }

  private setMessage(isPassed: boolean) {
    const { onTestRun } = this.props;
    onTestRun && onTestRun([{ testText: TEST_MESSAGE, isPassed: isPassed }]);
  }

  private getPublicState() {
    const { onLogMessage, keeperApi } = this.props;

    keeperApi
      .getPublicState()
      .then((publicState: any) => {
        onLogMessage(JSON.stringify(publicState, null, '\t'));
        this.setMessage(false);
        this.setState({ notInitialized: !publicState.initialized });
      })
      .catch((error: any) => {
        onLogMessage(JSON.stringify(error, null, '\t'));
        this.setMessage(true);
        if (error.message === 'Init Waves Keeper and add account') {
          this.setState({ notInitialized: true });
        }
      });
  }

  public render() {
    return (
      <CaseCard
        title='Кипер установлен, но не инициализирован паролем'
        text='Установить кипер, не инициализировать пароль.'
        passed={this.state.notInitialized}
        onCheck={() => this.getPublicState()}
        onClear={() => this.onClear()}
      />
    );
  }
}
