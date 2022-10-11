import React from "react";
import {Route, Routes, Navigate, Link} from 'react-router-dom';
import Register from "../auth/Register";
import Login from "../auth/Login";
import Admin from "../Admin";
import Home from "../Home";
import axios from "axios";
import swal from "sweetalert";

function Navbar() {
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`api/logout`).then(async res => {
            if (res.data.success === true) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('role_as');
                await swal({
                    title: "Başarılı",
                    text: "Çıkış Başarılı",
                    icon: "success",
                    button: "Tamam",
                });
                navigation.navigate('/');
            } else {
                await swal({
                    title: "Başarısız",
                    text: "Çıkış Başarısız",
                    icon: "warning",
                    button: "Tamam",
                });
            }
        });
    }

    let AuthButtons = '';
    let AuthAdmin = '';

    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login">Giriş Yap</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/register">Kayıt Ol</Link>
                </li>
            </ul>
        )
    } else {
        // If Admin
        if (localStorage.getItem('role_as') === "1") {
            AuthAdmin = (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/admin">Kullanıcılar</Link>
                    </li>
                </ul>
            )
            // If Not Admin
        } else {
            AuthAdmin = (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Ana Sayfa</Link>
                    </li>
                </ul>
            )
        }

        AuthButtons = (
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown"
                          aria-expanded="false">
                        {localStorage.getItem('auth_name')}
                    </Link>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" onClick={logoutSubmit} to="/logout">Çıkış Yap</Link></li>
                    </ul>
                </li>
            </ul>
        );
    }

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid ">
                    {AuthAdmin}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        {AuthButtons}
                    </div>
                </div>
            </nav>

            <Routes>
                <Route path="*" element={<Navigate to="/" replace/>}/>

                <Route path="/"
                       element={!localStorage.getItem('auth_token') ? <Navigate to="/login" replace/> : <Home/>}/>
                <Route path="/admin" element={<Admin/>}/>

                <Route path="/login"
                       element={localStorage.getItem('auth_token') ? <Navigate to="/" replace/> : <Login/>}/>
                <Route path="/register"
                       element={localStorage.getItem('auth_token') ? <Navigate to="/" replace/> : <Register/>}/>

            </Routes>

        </div>
    )
}

export default Navbar
