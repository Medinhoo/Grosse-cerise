import React, { useEffect, useState } from 'react';
import "../style.css";
import { user$ } from '../rxjs';
import { Box, CircularProgress } from '@mui/material';

const MyProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = user$.subscribe(u => setUser(u));
    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return (

      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      >
    <CircularProgress />
  </Box>
  )
  }

  const createdDate = user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : 'N/A';
  const updatedDate = user.updatedAt ? new Date(user.updatedAt).toISOString().split('T')[0] : 'N/A';

  return (
    <div className="profile">
      <div className="card">
        <p>{user.username || 'N/A'}</p>
        <p>Password: {user.password || 'N/A'}</p>
        <p>Lists created: {user.groceryLists ? user.groceryLists.length : 0}</p>
        <p>Created: {createdDate}</p>
        <p>Last Update: {updatedDate}</p>
      </div>
    </div>
  );
}

export default MyProfile;
