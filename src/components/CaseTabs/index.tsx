import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { MainSetup } from '../cases/MainSetup';
import { KeeperService } from '../../services/KeeperService';
import { ITestStep } from '../../global';
import './index.scss';

export class CaseTabs extends Component<IProps> {
  render() {
    return (
      <div className='tabs-wrapper'>
        <Tabs defaultActiveKey='MainSetup' id='uncontrolled-tab-example'>
          <Tab eventKey='MainSetup' title='Общие настройки' style={{ padding: '2rem 0' }}>
            <MainSetup {...this.props} />
          </Tab>
          <Tab eventKey='profile' title='Profile'></Tab>
          <Tab eventKey='contact' title='Contact' disabled></Tab>
        </Tabs>
      </div>
    );
  }
}

interface IProps {
  keeperApi: KeeperService;
  onLogMessage: (logMessage: any) => void;
  onTestRun: (testSteps: Array<ITestStep>) => void;
}
