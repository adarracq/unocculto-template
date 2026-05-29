// src/app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirige instantanément vers notre layout à onglets
  return <Redirect href="/(tabs)/learn" />;
}