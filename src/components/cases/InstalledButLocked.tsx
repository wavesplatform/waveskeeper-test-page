import React from "react";
import { CaseCard } from "../CaseCard/CaseCard";
import { Container, Row, Col } from "react-bootstrap";
import { KeeperService } from "../../services/KeeperService";

export class InstalledButLocked extends React.Component<IProps> {
  public keeper: any;

  public readonly state = {
    notInitialized: undefined
  };

  componentDidMount() {
    const { keeperApi } = this.props;
    this.keeper = new KeeperService(keeperApi);
  }

  public onClear() {
    const { onLogMessage } = this.props;
    this.setState({ notInitialized: undefined });
    onLogMessage('');
  }

  private getPublicState() {
    const { onLogMessage } = this.props;

    this.keeper.getPublicState()
        .then((publicState: any) => {
        onLogMessage(JSON.stringify(publicState));

        this.setState({ notInitialized: !publicState.initialized });
        })
        .catch((error: any) => {
            
            if (error.message === 'Init Waves Keeper and add account') {
                onLogMessage(JSON.stringify(error));
                this.setState({ notInitialized: true });
            }
        });
  }

  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <CaseCard
              title="Кипер установлен, но не инициализирован паролем"
              text="Установить кипер, не инициализировать пароль."
              passed={ this.state.notInitialized }
              onCheck={ () => this.getPublicState() }
              onClear={ () => this.onClear() }
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

interface IProps {
  keeperApi: any;
  onLogMessage: any;
}
