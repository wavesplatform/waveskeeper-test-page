import React from "react";
import { Container, Row, Col, Jumbotron, Navbar } from "react-bootstrap";
import { InstalledButLocked } from "../cases/InstalledButLocked";
import { ConsoleOutput } from "../ConsoleOutput/ConsoleOutput";

export class KeeperFeatures extends React.Component {
  public keeperApi: any;

  state = {
    keeperInitiated: false,
    logMessage: ""
  };

  public setLogMessage = (logMessage: any) => {
    this.setState({ logMessage });
  };

  componentDidMount() {
    (window.WavesKeeper as any).initialPromise.then(
      (apiWavesKeeper: typeof window.WavesKeeper) => {
        this.keeperApi = apiWavesKeeper;
        this.setState({ keeperInitiated: true });
      }
    );
  }

  public render() {
    return (
      <>
        <Container>
          <Row>
            <Col>
              {this.state.keeperInitiated && (
                <InstalledButLocked
                  keeperApi={this.keeperApi}
                  onLogMessage={this.setLogMessage}
                />
              )}
            </Col>
          </Row>
        </Container>
        <Navbar fixed='bottom' bg='dark' style={{flexWrap: 'wrap', minHeight: '200px'}}>
          <ConsoleOutput>{this.state.logMessage}</ConsoleOutput>
        </Navbar>
      </>
    );
  }
}
