import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { InstalledButLocked } from '../cases/InstalledButLocked';
import { ConsoleOutput } from '../ConsoleOutput/ConsoleOutput';
import { KeeperService } from '../../services/KeeperService';
import { NetworkCheck } from '../cases/NetworkCheck';
import { LockedResource } from '../cases/LockedResource';
import { NotificationsFromLocked } from '../cases/NotificationsFromLocked';

export class KeeperFeatures extends React.Component {
  public keeperService: any;

  state = {
    keeperInitiated: false,
    logMessage: ''
  };

  public setLogMessage = (logMessage: any) => {
    if (logMessage === false) {
      this.setState({ logMessage });
      return;
    }
    const newMessage = this.state.logMessage
      ? this.state.logMessage + '\n\n' + logMessage
      : logMessage;
    this.setState({ logMessage: newMessage });
  };

  componentDidMount() {
    (window.WavesKeeper as any).initialPromise.then(
      (apiWavesKeeper: typeof window.WavesKeeper) => {
        this.keeperService = new KeeperService(apiWavesKeeper);
        this.setState({ keeperInitiated: true });
      }
    );
  }

  private renderCards() {
    if (this.state.keeperInitiated) {
      return (
        <>
          <InstalledButLocked
            keeperApi={this.keeperService}
            onLogMessage={this.setLogMessage}
          />
          <NetworkCheck
            keeperApi={this.keeperService}
            onLogMessage={this.setLogMessage}
          />
          <LockedResource
            keeperApi={this.keeperService}
            onLogMessage={this.setLogMessage}
          />
          <NotificationsFromLocked
            keeperApi={this.keeperService}
            onLogMessage={this.setLogMessage}
          />
        </>
      );
    }
  }

  public render() {
    return (
      <>
        <Container>
          <Row>
            <Col>{this.renderCards()}</Col>
          </Row>
        </Container>
        <Navbar fixed='bottom' bg='dark' style={{ flexWrap: 'wrap' }}>
          <ConsoleOutput onClear={this.setLogMessage}>
            {this.state.logMessage}
          </ConsoleOutput>
        </Navbar>
      </>
    );
  }
}
