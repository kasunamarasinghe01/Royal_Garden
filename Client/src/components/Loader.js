import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";


  

function Loader() {
  let [loading, setLoading] = useState(true);
  

 
  return (
    <div style={{marginTop:'200px', textAlign:'center'}}>
        <div className="sweet-loading ">
      <HashLoader
        color='#000'
        loading={loading}
        css=""
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  );
}

export default Loader;
