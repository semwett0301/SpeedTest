import {useEffect} from "react";
import request from "./api/request";

function App() {

  useEffect(() => {
    const getIp = async () => {
      console.log(await request.ip())
    }

    getIp().catch(e => console.log(e))
  }, [])

  return (
    <div>
    </div>
  );
}

export default App;
