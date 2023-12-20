import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "./Header.module.css";
import logoImg from "../../assets/images/logo.png";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ReNav = ({ slug, end, title }) => {
  return (
    <Nav.Link as="span">
      <NavLink className={styles.navlink} to={slug} end={!!end}>
        {title}
      </NavLink>
    </Nav.Link>
  );
};
ReNav.propTypes = {
  slug: PropTypes.string,
  end: PropTypes.bool,
  title: PropTypes.string,
};

const Header = () => {
  const { isAuth, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as="span">
            <NavLink to={"/"}>
              <img src={logoImg} alt="logo" />
            </NavLink>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <ReNav slug={"/"} end title={"home"} />
            <ReNav slug={"/blog"} end title={"blog"} />
            {/* <ReNav slug={"/login"} title={"login"} /> */}
            {isAuth ? (
              <>
                <ReNav slug={"/blog/new"} title={"newPost"} />
                <span className={`btn ${styles.navlink}`} onClick={logout}>
                  logout
                </span>
              </>
            ) : (
              <>
                <ReNav slug={"/login"} title={"login"} />
                <ReNav slug={"/signup"} title={"signup"} />
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
