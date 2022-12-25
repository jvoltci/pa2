import './App.css'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import SidePanel from './components/SidePanel/SidePanel'
import { Display } from './components/Display/Display'
import { useDisplayStore } from './store/displayStore'
import { Login } from './components/Login/Login'
import Logo from './components/pa2.png'

function App() {
  const isAuthenticated = useDisplayStore(state => state.isAuthenticated)
  return isAuthenticated ? (
    <>
      <Grid
        h='100vh'
        templateRows='repeat(12, 1fr)'
        templateColumns='repeat(18, 1fr)'
        gap={2}
      >
        <GridItem rowSpan={2} colSpan={18} bg='crimson'>
          <Flex align={'center'} h='100%' justify={'center'}>
            <img src={Logo} style={{width: '20%', height: '80px'}} />
          </Flex>
        </GridItem>

        <GridItem rowSpan={9} colSpan={4} bg='papayawhip'>
          <SidePanel />
        </GridItem>

        <GridItem overflowY={'scroll'} rowSpan={9} colSpan={14} bg='white'>
          <Display />
        </GridItem>

        <GridItem colSpan={18} bg='papayawhip' />
      </Grid>
    </>
  ) : <Login />
}

export default App;
