import React from 'react';
import { ITestStep } from '../../../global';
import { InstalledButLocked } from './InstalledButLocked';
import { NetworkCheck } from './NetworkCheck';
import { LockedResource } from './LockedResource';
import { NotificationsFromLocked } from './NotificationsFromLocked';
import { NotificationsFromUnlocked } from './NotificationsFromUnlocked';
import { KeeperService } from '../../../services/KeeperService';
import { AuthData } from './AuthData';

export const MainSetup: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div>
      <InstalledButLocked {...props} />
      <NetworkCheck {...props} />
      <LockedResource {...props} />
      <NotificationsFromLocked {...props} />
      <NotificationsFromUnlocked {...props} />
      <NotificationsFromUnlocked
        {...props}
        notificationTitle='Привет!!!'
        notificationMessage='Купи токены, получи призы!!!!'
        title='Получение сообщений на РУССКОМ с разблокированного ресурса'
      />
      <AuthData {...props} />
    </div>
  );
};

interface IProps {
  keeperApi: KeeperService;
  onLogMessage: (logMessage: any) => void;
  onTestRun: (testSteps: Array<ITestStep>) => void;
}
