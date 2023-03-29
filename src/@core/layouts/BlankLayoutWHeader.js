// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import VerticalNavHeader from './components/vertical/navigation/VerticalNavHeader'
import Footer from './components/shared-components/footer'
import { useSettings } from '../hooks/useSettings'
import Button from '@mui/material/Button'
import ModeToggler from './components/shared-components/ModeToggler'
import UserDropdown from './components/shared-components/UserDropdown'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayoutWHeader = ({ children }) => {
  const { settings, saveSettings } = useSettings()

  return (
    <>
      <BlankLayoutWrapper className='layout-wrapper'>
        <Box style={{ display: 'flex', justifyContent: 'space-between', boxShadow: '1px 1px 12px rgba(0,0,0,.15)' }}>
          <VerticalNavHeader />
          <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', paddingRight: 5 }}>
            <Button target='_blank' href='https://www.motorsingh.com/about/#contact-us/'>
              Contact Us
            </Button>
            <Button target='_blank' href='https://motorsingh.com/'>
              Browse Cars
            </Button>
            <ModeToggler settings={settings} saveSettings={saveSettings} />
            {/*<NotificationDropdown />*/}
            <UserDropdown />
          </Box>
        </Box>
        <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
          {children}
        </Box>
      </BlankLayoutWrapper>
      <Footer settings={settings} />
    </>
  )
}

export default BlankLayoutWHeader
