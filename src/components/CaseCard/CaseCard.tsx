import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Button,
  AlertProps,
  ButtonToolbar,
  Accordion
} from 'react-bootstrap';
import './caseCard.css';

export const CaseCard: React.FunctionComponent<IProps> = (props: IProps) => {
  function switchColor(passed: IProps['passed']): AlertProps['variant'] {
    switch (passed) {
      case undefined:
        return 'secondary';
      case true:
        return 'success';
      case false:
        return 'danger';
      default:
        return 'secondary';
    }
  }

  return (
    <Container style={{ marginBottom: '20px' }}>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Accordion>
                <Card.Title>{props.title}</Card.Title>
                <Alert variant={switchColor(props.passed)}>{props.text}</Alert>

                <Accordion.Collapse eventKey='0'>
                  <Card.Body>{props.value}</Card.Body>
                </Accordion.Collapse>

                <ButtonToolbar>
                  <Button
                    variant='primary'
                    onClick={() => props.onCheck()}
                    className='button-check'
                  >
                    Проверить
                  </Button>
                  <Button
                    variant='secondary'
                    onClick={() => props.onClear()}
                    disabled={props.passed === undefined}
                  >
                    Сброс
                  </Button>
                  {props.value && (
                    <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                      Подробности
                    </Accordion.Toggle>
                  )}
                </ButtonToolbar>
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

interface IProps {
  title: string;
  passed: boolean | undefined;
  text: string;
  value?: string | null;
  onCheck: Function;
  onClear: Function;
}

CaseCard.defaultProps = {
  title: 'Card Title',
  passed: undefined,
  text: 'Card Text',
  value: null,
  onCheck: () => {
    console.log('Check');
  },
  onClear: () => {
    console.log('Clear');
  }
};
