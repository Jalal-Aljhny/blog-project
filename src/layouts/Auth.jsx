import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <main className="auth_layout">
      <Outlet />
    </main>
  );
};

export default Auth;
