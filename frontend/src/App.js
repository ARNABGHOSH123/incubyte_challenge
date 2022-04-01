import { useState } from "react";
import CreateWords from "./CreateWord";
import ViewAllWords from "./ViewWords";

function App() {
  const [viewEnabled,setViewEnabled] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-screen w-full">
      <CreateWords />
        {!viewEnabled?
        <button
            type="button"
            className={`border border-red-400 hover:bg-red-500 hover:text-white text-red-400 w-48 p-2 rounded`}
            onClick={(_)=> {
              setViewEnabled(true);
            }}
          >
            View All Words
          </button>:
          <button
            type="button"
            className={`border border-red-400 hover:bg-red-500 hover:text-white text-red-400 w-48 p-2 rounded`}
            onClick={(_)=> {
              setViewEnabled(false);
            }}
          >
            <div className={'flex space-x-2 items-center justify-center'}>
              <span className={'text-lg'}>{'<'}</span>
              <span>Back</span>
            </div>
          </button>}
      <ViewAllWords viewEnabled={viewEnabled}/>
    </div>
  );
}

export default App;
