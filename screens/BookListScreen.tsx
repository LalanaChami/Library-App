import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { NavigationProp } from '@react-navigation/native';

interface Book {
  id: string;
  title: string;
  author: string;
  isBorrowed: boolean;
}

export const BookListScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const booksRef = ref(db, 'books');
    const unsubscribe = onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      const loadedBooks = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      setBooks(loadedBooks);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Button 
        mode="contained" 
        style={styles.button}
        onPress={() => navigation.navigate('BorrowedBooks')}
      >
        View Borrowed Books
      </Button>
      
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}>
            <Card.Content>
              <Title>{item.title}</Title>
              <Title style={styles.author}>{item.author}</Title>
              <Title style={styles.status}>
                {item.isBorrowed ? 'Borrowed' : 'Available'}
              </Title>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { margin: 5 },
  author: { fontSize: 16, color: '#666' },
  status: { fontSize: 14, color: '#888' },
  button: { margin: 10 }
});