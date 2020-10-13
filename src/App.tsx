
import React from "react";
import "./App.css";
import Auth from "./auth/Auth";
import Navigation from "./home/Navigation";
import BoardHome from "./boardDisplay/BoardHome";


export interface AppProps {}

export interface AppState {
  token: any;
  window: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { token: "", window: window.innerWidth };
  }
  render() {
    return (
      <div className="image1">
        <Auth token={this.state.token} />
        <Navigation window={this.state.window} />
        <BoardHome token={this.state.token} />
      </div>
    );
  }
}

export default App;
