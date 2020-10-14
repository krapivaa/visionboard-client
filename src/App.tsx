import React from "react";
import "./App.css";
import Auth from "./auth/Auth";
import Navigation from "./home/Navigation";
import BoardHome from "./boardDisplay/BoardHome";

export interface AppProps {}

export interface AppState {
  token: string;
  window: number;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { token: "", window: window.innerWidth };
  }

  setToken = (token: string) => {
    this.setState({token: token})
  }

  render() {
    return (
      <div className="image1">
        <Auth setToken={this.setToken} />
        <Navigation window={this.state.window} />
        <BoardHome token={this.state.token} />
        {/* <BoardHome token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjU0ODU2NywiZXhwIjoxNjAyNjM0OTY3fQ.VpebcHEvS1oVYSl2pn9WMAUq_Xk5kVAot6QVABt9ZNQ"}/> */}
      </div>
    );
  }
}

export default App;
