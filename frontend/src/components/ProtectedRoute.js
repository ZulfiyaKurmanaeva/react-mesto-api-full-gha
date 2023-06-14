import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
    props.loggedIn ? (
        <Component {...props} />
    ) : (
        <Navigate to="/sign-in" replace />
    );
}

export default ProtectedRoute;