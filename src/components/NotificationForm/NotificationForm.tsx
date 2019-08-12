import React from 'react';
import {
  FormGroup,
  FormControl,
  FormLabel,
  Form,
  FormControlProps
} from 'react-bootstrap';

export class NotificationForm extends React.Component<IProps> {
  state = {
    titleValue: this.props.formValues.title,
    messageValue: this.props.formValues.message
  };

  private onChangeTitle = (event: React.FormEvent<FormControlProps>) => {
    this.props.onChange({
      title: event.currentTarget.value
    });
    this.setState({ titleValue: event.currentTarget.value });
    console.log(event.currentTarget.value);
  };

  private onChangeMessage = (event: React.FormEvent<FormControlProps>) => {
    this.props.onChange({
      message: event.currentTarget.value
    });
    this.setState({ messageValue: event.currentTarget.value });
    console.log(event.currentTarget.value);
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormControl
            type='text'
            placeholder='Title'
            value={this.state.titleValue}
            onChange={this.onChangeTitle}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Message</FormLabel>
          <FormControl
            type='text'
            placeholder='Message'
            value={this.state.messageValue}
            onChange={this.onChangeMessage}
          />
        </FormGroup>
      </Form>
    );
  }
}

interface IProps {
  // onSubmit: WavesKeeper.INotificationData;
  onChange: any;
  formValues: any;
}
