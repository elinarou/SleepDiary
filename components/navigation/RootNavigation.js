import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import LoggedOutStack from './LoggedOutStack';
import LoggedInStack from './LoggedInStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <LoggedInStack /> : <LoggedOutStack />;
};