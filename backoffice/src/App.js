import {RecoilRoot,} from 'recoil';
import React from 'react';
import HOC from "./Pages/HOC";
import Loading from "./componenets/Loading/Loading";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <React.Suspense fallback={<Loading />}>
          <HOC />
        </React.Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;
