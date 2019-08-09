import React from 'react';
import { KeeperFeatures } from './components/KeeperFeatures/KeeperFeatures';
import './App.css';
import { Jumbotron } from 'react-bootstrap';

function App() {
  return (
    <div className='view'>
      <Jumbotron>
        <h1>Keeper static page</h1>
      </Jumbotron>

      <KeeperFeatures />
    </div>
  );
}

export default App;
