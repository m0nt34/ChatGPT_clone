import LightBulb from '../../assets/icons/chatDirectionIcons/LightBulb'
import Plain from '../../assets/icons/chatDirectionIcons/Plain'
import Logo from '../../assets/icons/Logo'
import style from '../../assets/styles/pages/dashboardpage.module.scss'
const Dashboard = () => {
  return (
    <div className={style.dashboard}>
      <div className={style.empty_cont}>
        <header>
          <Logo/>
        </header>
      </div>
    </div>
  )
}

export default Dashboard