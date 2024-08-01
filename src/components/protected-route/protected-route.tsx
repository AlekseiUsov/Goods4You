// react
import { FC, useEffect } from "react";
// navigaton
import { Navigate, useLocation } from "react-router-dom";
// store
import { useAppDispatch } from "../../store";
import { resetUser, setLoading, setUser } from "../../store/slices/auth-slice";
// selector
import { useSelector } from "react-redux";
import { authSelector } from "../../store/selectors/selectors";
// component
import { Loader } from "../loader/loader";
// api
import { userApi } from "../../store/api";

interface IProtectedRouteElement {
  element: React.ReactElement;
  unAuth?: boolean;
}

export const ProtectedRoute: FC<IProtectedRouteElement> = ({
  element,
  unAuth = false,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { user, loading } = useSelector(authSelector);
  const { data, isError } = userApi.useFetchCurrentUserQuery(
    localStorage.getItem("token") ?? ""
  );

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
      dispatch(setLoading(false));
    }
    if (isError) {
      dispatch(resetUser());
      dispatch(setLoading(false));
    }
  }, [dispatch, data, isError]);

  if (loading) return <Loader />;

  if (!unAuth && !user)
    return <Navigate to="/login" state={{ path: location }} replace />;

  if (unAuth && user) {
    return <Navigate to={location.state?.path || "/"} replace />;
  }

  return element;
};
