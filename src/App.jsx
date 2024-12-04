import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Singin from './components/Signin';
import Singup from './components/Signup';
import OTP from './components/Otp';
import {MyGallery} from './components/Mygallery';
import ImageDetails from './components/Image';
import './assets/styles/general.css';
import './assets/styles/account.css';
import './assets/styles/home.css';
import './assets/styles/signup.css';
import './assets/styles/signin.css';
import './assets/styles/otp.css';
import './assets/styles/logo.css';
import Board from './components/Board';

const ContainerLayout = ({ children }) => (
  <div id="home-background">
    <div id="home-container">{children}</div>
  </div>
);

const App = () => {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ContainerLayout>
              <Home />
            </ContainerLayout>
          }
        />
        <Route
          path="/signin"
          element={
            <ContainerLayout>
              <Singin />
            </ContainerLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <ContainerLayout>
              <Singup />
            </ContainerLayout>
          }
        />
        <Route
          path="/otp"
          element={
            <ContainerLayout>
              <OTP />
            </ContainerLayout>
          }
        />

        <Route path="/my-gallery" 
        element={<MyGallery>
          <Board />
        </MyGallery>} />

        <Route path="/my-gallery/:image_id" 
        element={<MyGallery>
          <ImageDetails />
        </MyGallery>} />
      </Routes>
    </Router>
  );
};

export default App;
