import "./App.css";
import Header from "./componenets/Header";
import Homepage from "./componenets/Homepage";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./componenets/Login";
import Register from "./componenets/Register";
import { useEffect, useRef, useState } from "react";
import { db } from "./componenets/firebaseConfig";
import { contextData } from "./ContextData";
import Qrgenerate from "./componenets/Qrgenerate";
import Scanpage from "./Scanpage";

function App() {
  let [data, setData] = useState([]);
  let location = useLocation()
  let path = location.pathname

  useEffect(() => {
    const unsubscribe = db.collection("tracking").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(data)

  return (
    <contextData.Provider value={{ data , db }}>
      <div className="App container mx-auto ">
        { path !== '/qrgenerate' && <Header /> }
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/qrgenerate" element={<Qrgenerate />}></Route>
          <Route exact path="/scanpage" element={<Scanpage />}></Route>
        </Routes>
      </div>
    </contextData.Provider>
  );
}

export default App;
