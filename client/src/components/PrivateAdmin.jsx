import React from 'react'
import { Outlet,Navigate} from 'react-router-dom'

import { useSelector } from 'react-redux'

export default function PrivateAdmin() {
  const {user} = useSelector(state => state.admin)
  console.log('jgjughj',user);
return user ? <Outlet/> : <Navigate to='/admin-login'/>
}
