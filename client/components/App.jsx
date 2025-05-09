import React, { useState, useEffect } from 'react';
import {
  Navigate,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import Profile from './Profile.jsx';
import Login from './Login.jsx';
import Homepage from './Homepage.jsx';
import EstDrinkPage from './homepageChildren/EstDrinkPage.jsx';
import CreationStation from './CreationStation.jsx';
import FilteredPageHandler from './homepageChildren/FilteredPageHandler.jsx';
import Community from './Community.jsx';
import NavFilter from './homepageChildren/NavFilter.jsx';
import FriendProfile from './profileChildren/FriendProfile.jsx';
import BarHop from './BarHop.jsx';
import Reviews from './Reviews.jsx'
import LiquorCabinet from './liquorcabinetChildren/LiquorCabinet.jsx';
import LCForm from './liquorcabinetChildren/LCForm.jsx';
import Hangovers from './Hangovers.jsx';
import Trivia from './Trivia';
import Leaderboard from './Leaderboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemoryMatch from "./matchGame/MemoryMatch.jsx";



const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/auth/check-auth');
        setIsAuth(response.data.isAuthenticated);

        if (response.data.isAuthenticated) {
          const profileResponse = await axios.get('/auth/me');
          setUserProfile(profileResponse.data);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        setIsAuth(false);
        throw new Error('Error checking auth', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      return <Navigate to='/' replace />;
    }
    return children;
  };

  if (loading) {
    return <div>Loading... Please wait</div>;
  }

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setIsAuth(false);
      setUserProfile(null);
      navigate('/');
    } catch (error) {
      throw new Error('Error during logout:', error);
    }
  };

  const appStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #000000, #434343)',
    color: '#ffffff',
  };

  return (
    <div style={appStyle}>
      {isAuth && <NavFilter onLogout={handleLogout} />}
      <Routes>
        <Route path='/' element={!isAuth ? <Login /> : <Navigate to='/home' replace />} />
        <Route path='/home' element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path='/estdrink/:id' element={<ProtectedRoute><EstDrinkPage /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/bar-hop' element={<ProtectedRoute><BarHop /></ProtectedRoute>} />
        <Route path='/creationStation' element={<ProtectedRoute><CreationStation /></ProtectedRoute>} />
        <Route path="/drink/:drinkId" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
        <Route path='/community' element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path='/filtered/:filter/*' element={<ProtectedRoute><FilteredPageHandler /></ProtectedRoute>} />
        <Route path='/profile/friend/:id' element={<ProtectedRoute><FriendProfile /></ProtectedRoute>} />
        <Route path="/memory-match" element={<ProtectedRoute><MemoryMatch /></ProtectedRoute>} />


        <Route path='/liquor' element={<ProtectedRoute><LiquorCabinet /></ProtectedRoute>} />
        <Route path='/form' element={<ProtectedRoute><LCForm /></ProtectedRoute>} />
        <Route path='/hangovers' element={<ProtectedRoute><Hangovers /></ProtectedRoute>}/>
        <Route path='/trivia' element={<ProtectedRoute><Trivia /></ProtectedRoute>} />
        <Route path='/leaderboard' element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
