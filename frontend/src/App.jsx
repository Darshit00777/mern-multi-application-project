
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import MainNavbar from "./component/MainNavbar";
import Q1Navbar from "./component/q1/Q1Navbar";
import Login from "./component/q1/Login";
import Registration from "./component/q1/Registration";
import Q2 from "./component/q2/Q2";
import store from "./Store";
import Q3 from "./component/q3/Q3";
import Q4 from "./component/q4/ExpenseTracker";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogout = () => {
        setLoggedIn(false);
    };

    return (
        <Provider store={store}>
            <BrowserRouter>
                <MainNavbar />

                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/q1/login" />}
                    />

                    <Route
                        path="/q1/login"
                        element={
                            <>
                                <Q1Navbar onLogout={handleLogout} />
                                <Login onLogin={() => setLoggedIn(true)} />
                            </>
                        }
                    />

                    <Route
                        path="/q1/registration"
                        element={
                            <>
                                <Q1Navbar onLogout={handleLogout} />
                                {loggedIn ? (
                                    <Registration />
                                ) : (
                                    <Navigate to="/q1/login" />
                                )}
                            </>
                        }
                    />

                    <Route path="/q2/*" element={<Q2 />} />

                    <Route path="/q3/*" element={<Q3 />} />

                    <Route path="/q4" element={<Q4 />} />

                    <Route
                        path="*"
                        element={<Navigate to="/q1/login" />}
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
