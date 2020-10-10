import React from "react";
import "./App.css";
import Navigation from "./home/Navigation";
// import BoardHome from "./boardDisplay/BoardHome";

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
        <Navigation />
        {/* <h1>Vision Board App</h1> */}
        {/* <BoardHome /> */}
      </div>
    );
  }
}

export default App;
