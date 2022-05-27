import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Provider as PaperProvider } from 'react-native-paper';

import { DashboardPage, TransactionsPage } from '@/pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { paths } from '@/shared/config';

const Stack = createNativeStackNavigator();

export const App = () => {
  const [isFontLoaded] = useFonts({
    Gilroy200: require('@/shared/ui/assets/fonts/Gilroy-UltraLight.ttf'),
    Gilroy300: require('@/shared/ui/assets/fonts/Gilroy-Light.ttf'),
    Gilroy400: require('@/shared/ui/assets/fonts/Gilroy-Regular.ttf'),
    Gilroy500: require('@/shared/ui/assets/fonts/Gilroy-Medium.ttf'),
    Gilroy600: require('@/shared/ui/assets/fonts/Gilroy-Bold.ttf'),
    Gilroy800: require('@/shared/ui/assets/fonts/Gilroy-Black.ttf'),
  });
  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  if (!isFontLoaded) return null;

  return (
    <PaperProvider>
      <NavigationContainer theme={customTheme} independent>
        <Stack.Navigator initialRouteName={paths.dashboard.pathname} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={paths.dashboard.pathname} component={DashboardPage} />
          <Stack.Screen name={paths.transactions.pathname} component={TransactionsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};
