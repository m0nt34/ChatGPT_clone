import { Outlet } from 'react-router-dom'
import style from '../assets/styles/layouts/dashboardLayout.module.scss'

const DashboardLayout = () => {
  return (
    <div className={style.dashboardLayout}>
      <span className={style.menu}>MENU</span>
      <div className={style.content}>
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayout