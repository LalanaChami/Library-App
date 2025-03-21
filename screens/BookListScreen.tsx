import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { NavigationProp } from '@react-navigation/native';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedYear: number;
  isBorrowed: boolean;
  imageUrl: string;
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
        labelStyle={{ color: 'white', fontWeight: '600' }}
        onPress={() => navigation.navigate('BorrowedBooks')}
      >
        My Borrowed Books
      </Button>
      
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}>
            <Card.Cover source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <Card.Content style={{ padding: 16 }}>
              <Title style={{ color: '#034C53', fontWeight: '700' }}>{item.title}</Title>
              <Title style={styles.author}>{item.author}</Title>
              <Title style={[styles.status, { color: item.isBorrowed ? '#F38C79' : '#007074' }]}>
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
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: '#FBE4D6' 
  },
  card: { 
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#034C53',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  author: { 
    fontSize: 14, 
    color: '#007074',
    marginTop: 4,
    fontWeight: '500'
  },
  status: { 
    fontSize: 12, 
    color: '#F38C79',
    fontWeight: '700',
    marginTop: 8
  },
  button: { 
    margin: 16,
    backgroundColor: '#034C53',
    borderRadius: 8,
    paddingVertical: 6
  },
  cardImage: {
    height: 180,
    resizeMode: 'contain',
    backgroundColor: '#00707420'
  }
});