import { Oval } from 'react-loader-spinner'
import { useSelector } from 'react-redux'

const DefaultLoader = () => {
  const isLoading = useSelector(({ common }) => common.loading)

  if (!isLoading) {
    return <></>
  }

  return (
    <Oval
      height={50}
      width={50}
      color='#e15540'
      wrapperStyle={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }}
      wrapperClass=''
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor='#edaca1'
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  )
}

export default DefaultLoader
