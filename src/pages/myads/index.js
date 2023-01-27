import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material'
import {blue, red, yellow} from '@mui/material/colors'
import Account from 'mdi-material-ui/Account'
import AdsItem from '../../views/myads/AdsItem.js'
import axios from "axios";

const MyAdsPage = ({pageComponentProps}) => {

  const theme = useTheme();
  console.log(pageComponentProps, 'pageComponentProps');

  return (
    <Card sx={{width: '100%'}}>
      <CardHeader
        title={
          <Typography variant='h6' sx={{textTransform: 'uppercase'}}>
            My account
          </Typography>
        }
      />
      <CardContent sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Account fontSize='large'/>
          <Typography variant='h5' sx={{ml: 5}}>
            Username
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {xs: 'column', lg: 'row'},
            justifyContent: 'space-between',
            width: '100%',
            mt: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Button variant='outlined' size='small'>
              Edit Profile
            </Button>
            <Button variant='outlined' size='small' sx={{ml: 3}}>
              Change Password
            </Button>
          </Box>
          <Box sx={{display: 'flex', mt: {xs: 3, lg: 0}, alignItems: 'center'}}>
            <Button
              variant='contained'
              sx={{
                width: 100,
                color: blue[900],
                backgroundColor: 'white',
                borderRadius: 10,
                fontWeight: 700,
                boxShadow: 4,
                '&:hover': {
                  backgroundColor: theme.palette.grey[300],
                  borderColor: '#0062cc'
                }
              }}
            >
              Success
            </Button>
            <Button
              sx={{
                mx: 2,
                width: 100,
                color: yellow[900],
                backgroundColor: 'white',
                borderRadius: 10,
                fontWeight: 700,
                boxShadow: 4,
                '&:hover': {
                  backgroundColor: theme.palette.grey[300],
                  borderColor: '#0062cc'
                }
              }}
            >
              Super
            </Button>
            <Button
              sx={{
                width: 100,
                color: red[800],
                backgroundColor: 'white',
                borderRadius: 10,
                fontWeight: 700,
                boxShadow: 4,
                '&:hover': {
                  backgroundColor: theme.palette.grey[300],
                  borderColor: '#0062cc'
                }
              }}
            >
              Hyper
            </Button>
          </Box>
        </Box>
        <Divider sx={{my: 5}}/>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography sx={{textTransform: 'uppercase', fontWeight: 600}} variant='h6'>
            My car ads
          </Typography>
          <Typography sx={{cursor: 'pointer'}} variant='body2'>
            Clear filters
          </Typography>
        </Box>
        <Grid container sx={{mt: 1}} spacing={5}>
          <Grid item lg={3} xs={12}>
            <FormControl fullWidth size='small'>
              <InputLabel id='form-layouts-separator-select-label'>Select Make</InputLabel>
              <Select
                label='Country'
                defaultValue=''
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
              >
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} xs={12}>
            <FormControl fullWidth size='small'>
              <InputLabel id='form-layouts-separator-select-label'>Select Model</InputLabel>
              <Select
                label='Country'
                defaultValue=''
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
              >
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} xs={12}>
            <FormControl fullWidth size='small'>
              <InputLabel id='form-layouts-separator-select-label'>Latest First</InputLabel>
              <Select
                label='Country'
                defaultValue=''
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
              >
                <MenuItem value='UK'>UK</MenuItem>
                <MenuItem value='USA'>USA</MenuItem>
                <MenuItem value='Australia'>Australia</MenuItem>
                <MenuItem value='Germany'>Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Button
              size='small'
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark
                }
              }}
              variant='containd'
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Paper
          elevation={0}
          sx={{background: theme.palette.grey[200], p: 5, mt: 5, display: 'flex', flexDirection: 'column'}}
        >
          <Typography sx={{color: theme.palette.common.black, fontWeight: 600, textAlign: 'right'}}>
            Displaing 0 Ads listing
          </Typography>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs aria-label='basic tabs example' variant='scrollable'>
              <Tab label={`Active (0)`}/>
              <Tab label={`Awaiting Review (0)`}/>
              <Tab label={`Incomplete (0)`}/>
              <Tab label={`Deactive (0)`}/>
            </Tabs>
            <AdsItem/>
            <AdsItem/>
            <AdsItem/>
          </Box>
        </Paper>
      </CardContent>
    </Card>
  )
}

export async function getServerSideProps(ctx) {
  const {req, res} = ctx;

  const response = await axios.get('https://www.motorsingh.com/user/validate', {
    headers: {cookie: `PHPSESSID=${req.cookies.PHPSESSID};`}
  });

  if (!response?.data?.user_id) {
    return {
      redirect: {
        destination: 'https://www.motorsingh.com', statusCode: 302
      }
    };
  }
  const user = response?.data;
  req.user = user;

  return {
    props: {user}
  }
}

export default MyAdsPage;

