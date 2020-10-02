import React from "react";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//      <h1>Vision Board App</h1>
//       </header>
//     </div>
//   );
// }

// export default App;

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
        <h1>Vision Board App</h1>
      </div>
    );
  }
}

export default App;
