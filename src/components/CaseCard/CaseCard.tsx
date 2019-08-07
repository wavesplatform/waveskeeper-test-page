import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Button,
  AlertProps,
  ButtonToolbar
} from "react-bootstrap";
import "./caseCard.css";

export const CaseCard: React.FunctionComponent<IProps> = (props: IProps) => {
  function switchColor(passed: IProps["passed"]): AlertProps["variant"] {
    switch (passed) {
      case undefined:
        return "secondary";
      case true:
        return "success";
      case false:
        return "danger";
      default:
        return "secondary";
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Alert variant={switchColor(props.passed)}>{props.text}</Alert>
              <ButtonToolbar>
                <Button
                  variant="primary"
                  onClick={() => props.onCheck()}
                  className="button-check"
                >
                  Проверить
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => props.onClear()}
                  disabled={props.passed === undefined}
                >
                  Сброс
                </Button>
              </ButtonToolbar>
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
  onCheck: Function;
  onClear: Function;
}

CaseCard.defaultProps = {
    title: 'Card Title',
    passed: undefined,
    text: 'Card Text',
    onCheck: () => { console.log('Check') },
    onClear: () => { console.log('Clear') },
};
