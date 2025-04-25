import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
      
      // Check for token in localStorage (client-side only)
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (!token) {
        // Redirect to login if not authenticated
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    }, [router]);
    
    // Don't render anything during SSR or until component mounts on client
    if (!mounted) {
      return null;
    }
    
    if (isLoading) {
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <CircularProgress />
        </Box>
      );
    }
    
    return <WrappedComponent {...props} />;
  };
  
  return WithAuth;
};

export default withAuth; 