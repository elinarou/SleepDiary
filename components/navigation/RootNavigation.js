import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import LoggedOutStack from './LoggedOutStack';
import LoggedInStack from './LoggedInStack';

export default function RootNavigation() {
  const { user } = useAuthentication();
  // Checks user status
  return user ? <LoggedInStack /> : <LoggedOutStack />;
};