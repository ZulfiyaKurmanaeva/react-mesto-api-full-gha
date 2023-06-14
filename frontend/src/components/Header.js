import { Routes, Route, NavLink } from "react-router-dom";
import { Navbar, Container, NavbarBrand } from "react-bootstrap";

function Header({ userEmail, isLoggedIn, onLogout }) {
    return (
        <header className="header">
            <Navbar >
                <Container className="header__navbar-container">
                    <NavbarBrand className="header__logo" />
                    <div className="header__menu">
                        {isLoggedIn ? <p className="header__menu-item">{userEmail}</p> : ""}
                        <Routes>
                            <Route path="/" element={<NavLink to="/sign-in" className="header__menu-item" onClick={onLogout}>Выйти</NavLink>} />
                            <Route path="/sign-in" element={<NavLink to="/sign-up" className="header__menu-item">Регистрация</NavLink>} />
                            <Route path="/sign-up" element={<NavLink to="/sign-in" className="header__menu-item">Войти</NavLink>} />
                        </Routes>
                    </div>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
