// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import VerticalNavHeader from './components/vertical/navigation/VerticalNavHeader'
import Footer from './components/shared-components/footer'
import { useSettings } from '../hooks/useSettings'

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
        <VerticalNavHeader />
        <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
          {children}
        </Box>
      </BlankLayoutWrapper>
      <Footer settings={settings} />
    </>
  )
}

export default BlankLayoutWHeader
