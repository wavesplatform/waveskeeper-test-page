import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { WavesKeeperAdapter } from '@waves/signature-adapter';

export class KeeperFeatures extends React.Component {
  componentDidMount() {
    const adapter = WavesKeeperAdapter;
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
    );
  }
}
