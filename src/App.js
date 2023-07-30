import "./App.css";
import Header from "./componenets/Header";
import Homepage from "./componenets/Homepage";
import { Route, Routes, useLocation , useNavigate } from "react-router-dom";
import Login from "./componenets/Login";
import Register from "./componenets/Register";
import { useEffect, useRef, useState } from "react";
import { db } from "./componenets/firebaseConfig";
import { contextData } from "./ContextData";
import Qrgenerate from "./componenets/Qrgenerate";
import Scanpage from "./componenets/Scanpage";
import Dashboard from "./componenets/Dashboard";
import Mainpage from "./componenets/DashbaordComp/Mainpage";
import Logs from "./componenets/DashbaordComp/Logs";
import Tickets from "./componenets/DashbaordComp/Tickets";
import Profile from "./componenets/DashbaordComp/Profile";

function App() {
  let [data, setData] = useState([]);
  let location = useLocation()
  let path = location.pathname
  const [ authenticated , SetIsauthenticated ] = useState(false)

  useEffect(() => {
    const unsubscribe = db.collection("tracking").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    });

    return () => {
      unsubscribe() ;
    } ;
  }, []);


  useEffect(() => {
    if(localStorage.getItem('user')){
      SetIsauthenticated(true)
    }
  } ,  [])

  return (
    <contextData.Provider value={{ data , db }}>
      <div className="App mx-auto ">
      { !(path === '/qrgenerate' || path.includes('/account')) && < Header authenticated={authenticated} /> }

        <Routes>
          <Route exact path="/" element={<Homepage   />}></Route>
          <Route exact path="/login" element={<Login SetIsauthenticated={SetIsauthenticated} />}></Route>
          <Route exact path="/register" element={<Register  SetIsauthenticated={SetIsauthenticated} />}></Route>
          <Route exact path="/qrgenerate" element={<Qrgenerate />}></Route>
          <Route exact path="/scanpage" element={<Scanpage />}></Route>
          <Route exact path="/account" element={<Dashboard authenticated={authenticated} SetIsauthenticated={SetIsauthenticated} />}>
            <Route index element={<Mainpage />} />
            <Route exact path="history" element={<Logs />} />
            <Route exact path="tickets" element={<Tickets />} />
            <Route exact path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </contextData.Provider>
  );
}

export default App;
