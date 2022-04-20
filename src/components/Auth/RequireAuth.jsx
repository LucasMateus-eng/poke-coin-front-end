import { useLocation, useNavigate, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();
	let navigate = useNavigate();

	return auth?.email ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequireAuth;
