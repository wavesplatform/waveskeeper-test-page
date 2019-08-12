import React from 'react';
import { CaseCard } from '../CaseCard/CaseCard';
import { ICaseProps } from '../../global';

export class LockedResource extends React.Component<ICaseProps> {
  public readonly state = {
    resourceLocked: undefined,
  };

  public onClear() {
    const { onLogMessage } = this.props;
    this.setState({ resourceLocked: undefined });
    onLogMessage('');
  }

  private getPublicState() {
    const { onLogMessage, keeperApi } = this.props;

    keeperApi
      .getPublicState()
      .then((publicState: any) => {
        onLogMessage(JSON.stringify(publicState, null, '\t'));
        this.setState({ resourceLocked: false });
      })
      .catch((error: any) => {
        onLogMessage(JSON.stringify(error, null, '\t'));
        if (error.message === 'Api rejected by user') {
          this.setState({ resourceLocked: true });
        }
      });
  }

  public render() {
    const { resourceLocked } = this.state;
    return (
      <CaseCard
        title='Подпись транзакции с заблокированного ресурса'
        text='Заблокируйте доступ в (url-этого ресурса) в настройках Keeper'
        passed={resourceLocked}
        onCheck={() => this.getPublicState()}
        onClear={() => this.onClear()}
      />
    );
  }
}
