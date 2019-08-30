import React, { useState } from 'react';
import { ICaseProps } from '../../../global';
import { CaseCard } from '../../CaseCard/CaseCard';

export const AuthData: React.FunctionComponent<ICaseProps> = ({ keeperApi, onLogMessage, onTestRun }: ICaseProps) => {
  const [audthDone, setAuthStatus] = useState<boolean | undefined>(undefined);
  const [authResponse, setAuthResponse] = useState<string>('Ответ');

  const authData = () => {
    keeperApi
      .authData()
      .then((response: WavesKeeper.IAuthResponse) => {
        console.log(response);
        onLogMessage(JSON.stringify(response, null, '\t'));
        setAuthStatus(true);
        setAuthResponse(`address: ${response.address}\n public key: ${response.publicKey}`);
      })
      .catch((error: any) => {
        onLogMessage(JSON.stringify(error, null, '\t'));
        setAuthStatus(false);
        setAuthResponse(JSON.stringify(error, null, '\t'));
      });
  };

  const onReset = () => {
    setAuthStatus(undefined);
    onLogMessage('');
  };

  return (
    <CaseCard
      title='Подпись данных (Auth API как на chrome-ext.wvservices.com)'
      text={authResponse}
      passed={audthDone}
      onCheck={() => authData()}
      onReset={() => onReset()}
    />
  );
};
