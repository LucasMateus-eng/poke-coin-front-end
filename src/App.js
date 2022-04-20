import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import User from './components/User/User';
import HomeBroker from "./components/HomeBroker/HomeBroker";
import History from "./History/History";
import RequireAuth from "./components/Auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />

        <Route element={<RequireAuth />}>
          <Route path="user" element={<User />} />
          <Route path="homebroker" element={<HomeBroker />} />
          <Route path="/history" element={<History />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
