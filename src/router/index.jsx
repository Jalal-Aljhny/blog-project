import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/blog/Blog";
import Article from "../pages/blog/Article";
import NotFound from "../pages/NotFound";
import Default from "../layouts/Default";
import Auth from "../layouts/Auth";
import LogIn from "../pages/auth/LogIn";
import SignUp from "../pages/auth/SignUp";
import New from "../pages/blog/New";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MainRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/blog" element={<Default />}>
        <Route index element={<Blog />} />
        {isAuth ? (
          <Route path="new" element={<New />} />
        ) : (
          <Route path="new" element={<Navigate to="/signup" replace />} />
        )}
        <Route path=":title_detail" element={<Article />} />
      </Route>

      <Route path="/" element={<Auth />}>
        {!isAuth ? (
          <Route path="login" element={<LogIn />} />
        ) : (
          <Route path="login" element={<Navigate to="/" replace />} />
        )}
        {!isAuth ? (
          <Route path="signup" element={<SignUp />} />
        ) : (
          <Route path="signup" element={<Navigate to="/" replace />} />
        )}
      </Route>
    </Routes>
  );
};

export default MainRouter;
