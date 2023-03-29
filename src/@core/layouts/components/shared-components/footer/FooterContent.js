// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <Typography style={{ display: 'flex' }}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <span> {`© ${new Date().getFullYear()}, Made with `} </span>
          <Box component='span' sx={{ color: 'error.main' }}>
            <img width={32} height={32} alt='chart' src='/images/misc/made-with-love.png' />️
          </Box>
          <Box> {` by Motorsingh `}</Box>
        </Box>
      </Typography>
    </Box>
  )
}

export default FooterContent
