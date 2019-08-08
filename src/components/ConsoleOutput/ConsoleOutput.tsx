import React from 'react';
import { Button } from 'react-bootstrap';
import { FaExpand, FaTimes } from 'react-icons/fa';
import './consoleOutput.scss';

export const ConsoleOutput: React.FunctionComponent<IProps> = props => (
  <div className='console-output'>
    <div className='console-output__header'>
      <h3 className='console-output__title'>Console message:</h3>
      <div>
        <Button
          variant='warning'
          size='sm'
          onClick={() => props.onClear(false)}
          disabled={props.children.length === 0}
          style={{ marginRight: '10px' }}
        >
          clear
        </Button>
        <Button size='sm' variant='secondary' disabled style={{ marginRight: '10px' }}>
          <FaExpand />
        </Button>
        <Button size='sm' variant='danger' disabled>
          <FaTimes />
        </Button>
      </div>
    </div>
    <div className='console-output__content'>{props.children}</div>
  </div>
);

type IProps = {
  onClear: Function;
  children?: any;
};
