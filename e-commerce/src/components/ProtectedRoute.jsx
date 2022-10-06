import { Navigate } from 'react-router-dom'
import addProducts from './AddProducts'

const ProtectedRoute = ({
  isAuth,
  redirectTo = "/",
  userLogged
}) => {
  if(!isAuth) {
    return <Navigate to={redirectTo} replace/>
  }

  return <addProducts isAuth={isAuth} userLogged={userLogged}/>;
}

export default ProtectedRoute