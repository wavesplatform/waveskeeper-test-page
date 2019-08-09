import React from 'react';
import { CaseCard } from '../CaseCard/CaseCard';
import { NotificationForm } from '../NotificationForm/NotificationForm';

export class NotificationsFromLocked extends React.Component<IProps> {
  public readonly state = {
    notificationsLocked: undefined,
    formValues: {
      title: '',
      message: ''
    }
  };

  public onClear() {
    const { onLogMessage } = this.props;
    this.setState({ notificationsLocked: undefined });
    onLogMessage('');
  }

  //@TODO разобраться с типами
  // public onSubmit(formData: WavesKeeper.INotificationData) {
  public onSubmit(event: any) {
    event.preventDefault();
    console.log(event);

    this.setState({ formValues: event.currentTarget.value });
  }

  public onChange = (data: any) => {
    console.log(data);

    const { title, message } = this.state.formValues;

    const newValues = {
      title: title === data.title || !data.title ? title : data.title,
      message:
        message === data.message || !data.message ? message : data.message
    };

    console.log(newValues);

    this.setState({ formValues: newValues });
  };

  private notificateMe(notification?: WavesKeeper.INotificationData) {
    const { onLogMessage, keeperApi } = this.props;

    keeperApi
      .notification(notification)
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
        onCheck={() => this.notificateMe(this.state.formValues)}
        onClear={() => this.onClear()}
      >
        <NotificationForm onChange={this.onChange} />
      </CaseCard>
    );
  }
}

interface IProps {
  keeperApi: any;
  onLogMessage: any;
}
