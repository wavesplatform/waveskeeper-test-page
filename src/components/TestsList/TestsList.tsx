import React from 'react';
import { ITestStep } from '../../global';
import {
  ListGroup,
  Alert,
  Badge,
  AlertProps,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

export class TestsList extends React.Component<IProps> {
  private static getStatus(isPassed: boolean): AlertProps['variant'] {
    return isPassed ? 'success' : 'danger';
  }

  public render() {
    const { testSteps } = this.props;
    return (
      <ListGroup>
        {testSteps.map((test, key) => (
          <ListGroup.Item key={key}>
            <Container>
              <Row>
                <Col md={10}>
                  <Alert variant={TestsList.getStatus(test.isPassed)}>
                    {test.testText}
                  </Alert>
                </Col>
                <Col md={2}>
                  <Badge variant={TestsList.getStatus(test.isPassed)}>
                    {test.isPassed ? 'passed' : 'failed'}
                  </Badge>
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}

interface IProps {
  testSteps: Array<ITestStep>;
}
