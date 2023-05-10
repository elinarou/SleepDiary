import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../database/FirebaseConfig';


export function useAuthentication() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      };
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user
  };
}