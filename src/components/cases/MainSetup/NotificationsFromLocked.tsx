import React from 'react';
import { CaseCard } from '../../CaseCard/CaseCard';
import { NotificationForm } from '../../NotificationForm/NotificationForm';
import { ICaseProps } from '../../../global';

export class NotificationsFromLocked extends React.Component<NotificationProps>   {
  public readonly state = {
    notificationsLocked: undefined,
    formValues: {
      title: this.props.title || 'Hello!!!',
      message: this.props.message || 'Buy tokens and win the prize!!!!',
    },
  };

  public onReset() {
    const { onLogMessage } = this.props;
    this.setState({ notificationsLocked: undefined });
    onLogMessage('');
  }

  //@TODO разобраться с типами
  // public onSubmit(formData: WavesKeeper.INotificationData) {
  public onChange = (data: WavesKeeper.INotificationData) => {
    const { title, message } = this.state.formValues;

    const newValues = {
      title: title === data.title || !data.title ? title : data.title,
      message:
        message === data.message || !data.message ? message : data.message,
    };

    this.setState({ formValues: newValues });
  };

  private notificateMe(notification?: WavesKeeper.INotificationData) {
    const { onLogMessage, keeperApi } = this.props;

    keeperApi
      .notification(notification)
      .then((response: any) => {
        console.log(response);
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
        onCheck={() => this.notificateMe(this.state.formValues)}
        onReset={() => this.onReset()}
      >
        <NotificationForm
          onChange={this.onChange}
          formValues={this.state.formValues}
        />
      </CaseCard>
    );
  }
}

interface NotificationProps extends ICaseProps {
  title?: string;
  message?: string;
}