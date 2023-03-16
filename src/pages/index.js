// ** MUI Imports
// ** Icons Imports

// ** Custom Components Imports

// ** Styled Component Import

// ** Demo Components Imports
import { Box } from '@mui/material'

const Dashboard = () => {
  return <Box></Box>
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: '/mycars',
      permanent: false
    }
  }
}

export default Dashboard
