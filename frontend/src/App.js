import { Container } from 'react-bootstrap'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreens from './screens/HomeScreens';
import ExpedienteScreen from './screens/ExpedienteScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainPage from './screens/MainPage';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ExpedienteListScreen from './screens/ExpedienteListScreen';
import ExpedienteEditScreen from './screens/ExpedienteEditScreen';
import ExpedienteReporteScreen from './screens/ExpedienteReporteScreen';




function App() {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/MainPage' element={<MainPage/>} exact/>
              <Route path='/' element={<LoginScreen/>} exact/>
              <Route path='/admin/register/' element={<RegisterScreen/>} exact/>
              <Route path='/expedientes' element={<HomeScreens/>} exact/>
              <Route path='/expedientes/:id/' element={<ExpedienteScreen/>}/>
              <Route path='/expedientes/reporte/' element={<ExpedienteReporteScreen/>}/>
              <Route path='/admin/ListUsers/' element={<UserListScreen/>}/>
              <Route path='/admin/:id/edit' element={<UserEditScreen/>}/>

              
              <Route path='/admin/expedientes/' element={<ExpedienteListScreen/>}/>
              <Route path='/admin/expedientes/:id/edit' element={<ExpedienteEditScreen/>}/>
            </Routes>
          </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
