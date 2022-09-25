import { Container } from 'react-bootstrap'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreens from './screens/HomeScreens';
import ExpedienteScreen from './screens/ExpedienteScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/expedientes' element={<HomeScreens/>} exact/>
              <Route path='/expedientes/:id' element={<ExpedienteScreen/>}/>
            </Routes>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
