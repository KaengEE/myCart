import { Navigate, Outlet } from "react-router-dom";

// 유저인증 되면 처음에 요청한 자식 컴포넌트로 없을 경우 로그인페이지
const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
