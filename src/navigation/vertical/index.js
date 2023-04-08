// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import CarMultiple from 'mdi-material-ui/CarMultiple'
import Message from 'mdi-material-ui/Message'
import GoogleMyBusiness from 'mdi-material-ui/GoogleMyBusiness'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

const navigation = () => {
  return [
    {
      sectionTitle: 'Profile'
    },
    {
      title: 'Edit Profile',
      icon: AccountCogOutline,
      path: '/account-settings'
    },

    {
      title: 'My Cars',
      icon: CarMultiple,
      path: '/mycars'
    },
    {
      title: 'Manage Leads',
      icon: GoogleMyBusiness,
      path: '/leads'
    },
    {
      title: 'Messages',
      icon: Message,
      path: '/chats'
    }

    // {
    //   title: 'Sell Car',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // }
  ]
}

export default navigation
