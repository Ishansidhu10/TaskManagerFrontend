// C:\Users\Ishan's laptop\Documents\PROJECTS\Task-Manager\Task-Manager_IS\task-manager-frontend\pages\_app.tsx

import '../styles/globals.css'; // Import global CSS styles
import type { AppProps } from 'next/app'; // Import the type for AppProps
import { AuthProvider, useAuth,AuthContext } from '../contexts/AuthContext'; // Import the AuthProvider and useAuth hook
import AuthPage from '../components/AuthForm'; // Import the AuthPage or relevant component/page
import TasksPage from '../components/TaskPage';


// Define a wrapper component to handle authentication logic


// Define the custom App component
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContext>
        <Component {...pageProps} />
    </AuthContext>
  );
}

export default MyApp; // Export the custom App component
