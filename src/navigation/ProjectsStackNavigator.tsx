import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProjectsStackParamList } from './types';
import { ProjectsListScreen } from '../screens/ProjectsListScreen';
import { ProjectDetailsScreen } from '../screens/ProjectDetailsScreen';
import { theme } from '../theme/theme';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export const ProjectsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProjectsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          fontWeight: '700',
          color: theme.colors.textPrimary,
          fontSize: 17,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="ProjectsList"
        component={ProjectsListScreen}
        options={{ title: 'Projects' }}
      />
      <Stack.Screen
        name="ProjectDetails"
        component={ProjectDetailsScreen}
        options={{
          title: 'Project Specifications',
          headerBackTitle: 'Projects',
        }}
      />
    </Stack.Navigator>
  );
};
