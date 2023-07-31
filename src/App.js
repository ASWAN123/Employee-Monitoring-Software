import "./App.css";
import Header from "./componenets/Header";
import Homepage from "./componenets/Homepage";
import { Route, Routes, useLocation , Navigate, useParams, useNavigate   } from "react-router-dom";
import Login from "./componenets/Login";
import Register from "./componenets/Register";
import { useEffect, useRef, useState } from "react";
import { db } from "./firebaseConfig";
import { contextData } from "./ContextData";
import Qrgenerate from "./componenets/Qrgenerate";
import Scanpage from "./componenets/Scanpage";
import Dashboard from "./componenets/Dashboard";
import Mainpage from "./componenets/DashbaordComp/Mainpage";
import Logs from "./componenets/DashbaordComp/Logs";
import Tickets from "./componenets/DashbaordComp/Tickets";
import Profile from "./componenets/DashbaordComp/Profile";
import { auth } from "./firebaseConfig";
import { getAuth , onAuthStateChanged } from "firebase/auth";


function App() {
  let [data, setData] = useState([]);
  let location = useLocation()
  let path = location.pathname
  // const [ auth , setAuth] = useState(getAuth(myapp))
  let navigate = useNavigate()
  console.log({ ...auth} ,  '0')
  console.log(auth.currentUser ,  '1')


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


  return (
    <contextData.Provider value={{ data , db , auth }}>
      <div className="App mx-auto ">
      { !(path === '/qrgenerate' || path.includes('/account') || path.includes('/scanpage') ) && < Header auth={auth} /> }

        <Routes>
          <Route exact path="/" element={<Homepage   />}></Route>
          <Route exact path="/login" element={<Login auth={auth} />}></Route>
          <Route exact path="/register" element={<Register auth={auth} />}></Route>
          <Route exact path="/qrgenerate" element={ auth.currentUser ?  <Qrgenerate auth={auth} /> : <Navigate to='/login'/> }></Route>
          <Route exact path="/scanpage" element={<Scanpage />}></Route>
          <Route exact path="/account" element={ auth.currentUser ? <Dashboard auth={auth} /> : <Navigate to="/" /> }>
            <Route index element={<Mainpage />} />
            <Route exact path="history" element={ <Logs />   } />
            <Route exact path="tickets" element={ <Tickets /> } />
            <Route exact path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </contextData.Provider>
  );
}

export default App;
