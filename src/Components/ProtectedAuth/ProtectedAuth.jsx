
import { Navigate } from 'react-router-dom'

export const ProtectedAuth = ({children}) => {
    if(localStorage.getItem('tkn') !== null){
        return <Navigate to={'/'} />
    }

  return <>
  {children}
  </>
}
