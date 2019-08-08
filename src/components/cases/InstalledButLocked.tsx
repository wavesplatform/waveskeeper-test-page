import React from 'react';
import { CaseCard } from '../CaseCard/CaseCard';

export class InstalledButLocked extends React.Component<IProps> {
  public readonly state = {
    notInitialized: undefined
  };

  public onClear() {
    const { onLogMessage } = this.props;
    this.setState({ notInitialized: undefined });
    onLogMessage('');
  }

  private getPublicState() {
    const { onLogMessage, keeperApi } = this.props;

    keeperApi
      .getPublicState()
      .then((publicState: any) => {
        onLogMessage(JSON.stringify(publicState, null, '\t'));

        this.setState({ notInitialized: !publicState.initialized });
      })
      .catch((error: any) => {
        onLogMessage(JSON.stringify(error, null, '\t'));
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

interface IProps {
  keeperApi: any;
  onLogMessage: any;
}
