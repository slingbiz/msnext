// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      sectionTitle: 'Profile'
    },
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'My Cars',
      icon: FormatLetterCase,
      path: '/myads'
    },
    {
      title: 'Edit Profile',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      title: 'Manage Leads ',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Messages',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    {
      title: 'Sell Car',
      icon: AlertCircleOutline,
      path: '/pages/error',
      openInNewTab: true
    },

  ]
}

export default navigation
