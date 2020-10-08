
import React from 'react';
import './App.css';
import BoardHome from './boardDisplay/BoardHome';


export interface AppProps {}

export interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    // this.state = { :  };
  }
  render() {
    return (
      <div>
        <h1 style={{textAlign:"center"}}>Vision Board App</h1>
         <BoardHome />
      </div>
    );
  }
}

export default App;
