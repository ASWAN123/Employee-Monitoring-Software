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
import { DotWave } from '@uiball/loaders'

function App() {
  let [data, setData] = useState([]);
  let location = useLocation();
  let path = location.pathname;
  let navigate = useNavigate();
  const [Loading , setLoading] = useState(true);


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
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setTimeout(() => {
          setLoading(false)
        }, 3000) ;
        
      } else {
        setTimeout(() => {
          setLoading(false)
          navigate('/login')
        }, 2000);
        
  
      }
    });
  } ,  [])


  return (
    <>
       { !Loading && <contextData.Provider value={{ data , db , auth }}>
        <div className="App mx-auto  container ">
        { !(path === 'Employee-Monitoring-Software/qrgenerate' || path.includes('/account') || path.includes('/scanpage') ) && < Header auth={auth} /> }

          <Routes>
            <Route exact path="Employee-Monitoring-Software/" element={<Homepage   />}></Route>
            <Route exact path="Employee-Monitoring-Software/login" element={<Login auth={auth} />}></Route>
            <Route exact path="Employee-Monitoring-Software/register" element={<Register auth={auth} />}></Route>
            <Route exact path="Employee-Monitoring-Software/qrgenerate" element={ auth.currentUser ?  <Qrgenerate auth={auth} /> : <Navigate to='Employee-Monitoring-Software/'/> }></Route>
            <Route exact path="Employee-Monitoring-Software/scanpage" element={<Scanpage />}></Route>
            <Route exact path="Employee-Monitoring-Software/account" element={ auth.currentUser ? <Dashboard auth={auth} /> : <Navigate to="Employee-Monitoring-Software/" /> }>
              <Route index element={<Mainpage />} />
              <Route exact path="history" element={ <Logs />   } />
              <Route exact path="tickets" element={ <Tickets /> } />
              <Route exact path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </contextData.Provider> }
    { Loading &&     <div className="absolute  w-full h-screen z-11 top-0 bg-blue-950/80 flex justify-center items-center ">
            <DotWave 
            size={47}
            speed={1} 
            color="white" 
            />
    </div> }
    </>
  );
}

export default App;
