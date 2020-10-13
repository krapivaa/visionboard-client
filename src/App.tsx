// import React from 'react';
import React, { useState } from 'react';
import './App.css';
// import Auth from './auth/Auth';
// import  Login from './auth/Login';
import BoardHome from './boardDisplay/BoardHome';
// import Navigation from './home/Navigation'


function App() {
    // const [token, setToken] = useState("");
  

    return (
      <div>

    <div className="image1">
    {/* <h1 style={{textAlign:"center"}}>Vision Board</h1> */}
        {/* <Auth setToken={setToken}/> */}
        
        {/* <Navigation /> */}
        
        <BoardHome token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYwMjU0ODU2NywiZXhwIjoxNjAyNjM0OTY3fQ.VpebcHEvS1oVYSl2pn9WMAUq_Xk5kVAot6QVABt9ZNQ"}/>

      </div>
      </div>
    );
  }


 export default App;

//  import React from 'react';
// import './App.css';
// import BoardHome from './boardDisplay/BoardHome';


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
//          <BoardHome />
//       </div>
//     );
//   }
// }

// export default App;
