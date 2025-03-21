import { createStackNavigator } from '@react-navigation/stack';
import { BookListScreen } from '../screens/BookListScreen';
import { BookDetailsScreen } from '../screens/BookDetailsScreen';
import { BorrowedBooksScreen } from '../screens/BorrowedBooksScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="BookList" component={BookListScreen} options={{ title: 'Book Library' }} />
    <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
    <Stack.Screen name="BorrowedBooks" component={BorrowedBooksScreen} options={{ title: 'My Borrowed Books' }} />
  </Stack.Navigator>
);