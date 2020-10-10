import React, { useState } from "react";
import "./App.css";
import Auth from "./auth/Auth";
// import BoardHome from "./boardDisplay/BoardHome";

function App() {
  const [token, setToken] = useState("");
  return (
    <div className="image1">
      <h1>Vision Board App</h1>
      <Auth setToken={setToken} />
      {/* <BoardHome  /> */}
    </div>
  );
}

export default App;

// export interface AppProps {}

// export interface AppState {}

// class App extends React.Component<AppProps, AppState> {
//   constructor(props: AppProps) {
//     super(props);
//     // this.state = { :  };
//   }
//   render() {
//     return (
//       <div>

//         <h1 style={{textAlign:"center"}}>Vision Board App</h1>
//         <Navigation />
//         <!--         <Auth setToken={setToken}/>       -->
//         <BoardHome /> */}
//     </div>
//   );
// }

// export default App;
