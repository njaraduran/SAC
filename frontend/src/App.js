import { Container } from 'react-bootstrap'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreens from './screens/HomeScreens';
import ProductScreen from './screens/ExpedienteScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreens/>} exact/>
              <Route path='/product/:id' element={<ProductScreen/>}/>
            </Routes>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
