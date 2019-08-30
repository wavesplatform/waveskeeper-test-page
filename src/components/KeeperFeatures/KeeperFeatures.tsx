import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { ConsoleOutput } from '../ConsoleOutput/ConsoleOutput';
import { KeeperService } from '../../services/KeeperService';
import { TestsList } from '../TestsList/TestsList';
import { ITestStep } from '../../global';
import { CaseTabs } from '../CaseTabs';

export class KeeperFeatures extends React.Component<IProps, IState> {
  public keeperService: any;

  readonly state = {
    keeperInitiated: false,
    logMessage: '',
    testSteps: [],
  };

  //TODO type
  public setLogMessage = (logMessage: any) => {
    if (logMessage === false) {
      this.setState({ logMessage });
      return;
    }
    const newMessage = this.state.logMessage ? this.state.logMessage + '\n\n' + logMessage : logMessage;

    this.setState({ logMessage: newMessage });
  };

  public setTestStep = (testSteps: Array<ITestStep>) => {
    this.setState({ testSteps });
  };

  componentDidMount() {
    (window.WavesKeeper as any).initialPromise.then((apiWavesKeeper: typeof window.WavesKeeper) => {
      this.keeperService = new KeeperService(apiWavesKeeper);
      this.setState({ keeperInitiated: true });
    });
  }

  private renderCards() {
    const cardProps = {
      keeperApi: this.keeperService,
      onLogMessage: this.setLogMessage,
      onTestRun: this.setTestStep,
    };

    if (this.state.keeperInitiated) {
      return (
        <>
          <CaseTabs {...cardProps}/>
        </>
      );
    }
  }

  public render() {
    return (
      <>
        <Container style={{ flex: 1, overflow: 'auto' }} fluid={true}>
          <Row>
            <Col md={8}>{this.renderCards()}</Col>
            <Col md={4}>
              <TestsList testSteps={this.state.testSteps} />
            </Col>
          </Row>
        </Container>
        <Navbar bg='dark' style={{ flexWrap: 'wrap' }}>
          <ConsoleOutput onClear={this.setLogMessage}>{this.state.logMessage}</ConsoleOutput>
        </Navbar>
      </>
    );
  }
}

interface IState {
  keeperInitiated: boolean;
  logMessage: string;
  testSteps: Array<ITestStep>;
}

interface IProps {}
