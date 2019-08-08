import React from 'react';
import { CaseCard } from '../CaseCard/CaseCard';

export class NotificationsFromLocked extends React.Component<IProps> {
  public readonly state = {
    notificationsLocked: undefined
  };

  public onClear() {
    const { onLogMessage } = this.props;
    this.setState({ notificationsLocked: undefined });
    onLogMessage('');
  }

  private getPublicState() {
    const { onLogMessage, keeperApi } = this.props;

    keeperApi
      .notification()
      .then((response: any) => {
        onLogMessage(JSON.stringify(response, null, '\t'));
        this.setState({ notificationsLocked: false });
      })
      .catch((error: any) => {
        onLogMessage(JSON.stringify(error, null, '\t'));
        if (error.message === 'Api rejected by user') {
          this.setState({ notificationsLocked: true });
        }
      });
  }

  public render() {
    const { notificationsLocked } = this.state;
    return (
      <CaseCard
        title='Получение сообщений с заблокированного ресурса'
        text='Запретите доступ "Allow sending messages" в (url-этого ресурса) в настройках Keeper'
        passed={notificationsLocked}
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
