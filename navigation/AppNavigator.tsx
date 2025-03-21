import { createStackNavigator } from '@react-navigation/stack';
import { BookListScreen } from '../screens/BookListScreen/BookListScreen';
import { BookDetailsScreen } from '../screens/BookDetailsScreen/BookDetailsScreen';
import { BorrowedBooksScreen } from '../screens/BorrowedBooksScreen/BorrowedBooksScreen';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#007074',
        elevation: 8,
        shadowColor: '#007074',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderBottomWidth: 0,
      },
      headerTintColor: '#FFC1B4',
      headerTitleStyle: {
        fontWeight: '700',
        backgroundColor: '#007074',
        fontSize: 20,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
      },
      headerTitleAlign: 'center',
      // headerBackVisible: false,
      cardStyle: {
        backgroundColor: '#FFC1B4'
      }
    }}
  >
    <Stack.Screen 
      name="BookList" 
      component={BookListScreen} 
      options={{ 
        title: '📖 Book Library',
        headerTitleStyle: {
          color: '#F38C79',
          backgroundColor: '#007074',
          fontSize: 22,
          fontWeight: '800'
        }
      }} 
    />
    <Stack.Screen 
      name="BookDetails" 
      component={BookDetailsScreen} 
      options={{
        headerStyle: {
          backgroundColor: '#007074',
          elevation: 0
        },
        headerTintColor: '#FFC1B4'
      }}
    />
    <Stack.Screen 
      name="BorrowedBooks" 
      component={BorrowedBooksScreen} 
      options={{ 
        title: '📚 My Borrowed Books',
        headerTitleStyle: {
          color: '#F38C79',
          fontSize: 22,
          fontWeight: '800'
        }
      }} 
    />
  </Stack.Navigator>
);