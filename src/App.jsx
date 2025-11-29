import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './PAGES/HomePage';
import HomeLayout from './LAYOUTS/HomeLayout';
import ProfilePage from './PAGES/ProfilePage';
import RegisterPage from './PAGES/RegisterPage';
import LoginPage from './PAGES/LoginPage';
import DashboardPage from './PAGES/DashboardPage';
import ApplicationsPage from './PAGES/ApplicationsPage';
import NewApplicationPage from './PAGES/NewApplicationPage';
import ApplicationDetail from './PAGES/ApplicationDetail';
import AdminDashboard from './PAGES/AdminDashboard'; // Assuming you've created this page
import NotFound from './PAGES/NotFound'; // For fallback
import { useEffect } from 'react';
import { getProfile } from './REDUX/SLICES/authSlice';
import LoadingSpinner from './COMPONENTS/LoadingSpinner';
import AboutPage from './PAGES/AboutPage';
import HowItWorksPage from './PAGES/HowItWorksPage';

// Protect route for admin
const ProtectedAdminRoute = ({ user, children }) => {
  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  
   const dispatch = useDispatch()
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)

    // ✅ CHECK AUTH ON MOUNT
    useEffect(() => {
        // Try to get profile from token (if token exists in cookies)
        dispatch(getProfile())
    }, [dispatch])

    // ✅ SHOW LOADING WHILE CHECKING AUTH
    if (loading) {
        return (
            <LoadingSpinner/>
        )
    }
  return (
    <Routes>
      {/* Public routes with HomeLayout */}
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-applications" element={<ApplicationsPage />} />
        <Route path="/applications/:id" element={<ApplicationDetail />} />
        <Route path="/apply" element={<NewApplicationPage />} />
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='how-it-works' element={<HowItWorksPage/>} />
        {/* Admin section - using a nested route with protector */}
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute user={user}>
              {/* Wrap in fragment to keep nested routes */}
              <Routes>
                <Route path="" element={<AdminDashboard />} /> {/* Default admin page */}
                {/* Add more admin routes here */}
                {/* Example: <Route path="users" element={<AdminUsersPage />} /> */}
              </Routes>
            </ProtectedAdminRoute>
          }
        />

        {/* Catch-All for unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
