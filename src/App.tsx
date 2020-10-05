import React from 'react';
import './App.scss';
import MemoContainer from './components/MemoContainer'

function App() {
  return (
    <div className="wrapper">
      <div className="container" style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
        <MemoContainer />
      </div>
    </div>
  );
}

export default App;
