import { Container } from 'react-bootstrap'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreens from './screens/HomeScreens';
import ExpedienteScreen from './screens/ExpedienteScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainPage from './screens/MainPage';

function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/main' element={<MainPage/>} exact/>
              <Route path='/' element={<LoginScreen/>} exact/>
              <Route path='/register/' element={<RegisterScreen/>} exact/>
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
