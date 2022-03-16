import { lazy, Suspense } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import Homepage from "./components/constants/homepage";
import Headers from "./components/constants/header";
import * as ROUTES from "./components/constants/routes";

const Login = lazy(() => import('./components/login/login'));
const UserHome = lazy(() => import('./components/user/homepage'));
const AdminHome = lazy(() => import('./components/admin/homepage'))

function App(){
    return(
        <Router>
            <Headers />
            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    {/* <Route path={ROUTES.DEFAULT} element={<Homepage/>}/> */}
                    <Route path={ROUTES.LOGIN} element={<Login/>} />
                    <Route path={ROUTES.USERHOME} element={<UserHome/>} />
                    <Route path={ROUTES.ADMINHOME} element={<AdminHome/>} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;