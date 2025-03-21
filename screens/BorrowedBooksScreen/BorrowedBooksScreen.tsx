import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase';

export const BorrowedBooksScreen = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<any[]>([]);

  useEffect(() => {
    const userRef = ref(db, 'users/defaultUser/borrowedBooks');

    const unsubscribe = onValue(userRef, (snapshot) => {
      const bookIds = Object.keys(snapshot.val() || {});
      Promise.all(
          bookIds.map(bookId => 
               new Promise(resolve => 
                    onValue(ref(db, `books/${bookId}`), (bookSnap) => 
                    resolve({ id: bookId, ...bookSnap.val() }))
               ).then(books => setBorrowedBooks(books as any[]))
          )
     );
    });

    return () => unsubscribe();
  }, []);

  const handleReturn = async (bookId: string) => {
    const updates = {
      [`books/${bookId}/isBorrowed`]: false,
      [`users/defaultUser/borrowedBooks/${bookId}`]: null
    };

    try {
      await update(ref(db), updates);
    } catch (error) {
      Alert.alert('Error', 'Failed to return book');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content style={{ padding: 16 }}>
              <Title style={{ color: '#034C53', fontWeight: '700' }}>{item.title}</Title>
              <Title style={styles.author}>{item.author}</Title>
              <Button 
                mode="contained" 
                style={styles.button}
                labelStyle={{ color: 'white', fontWeight: '600' }}
                onPress={() => handleReturn(item.id)}
              >
                Return Book
              </Button>
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
    backgroundColor: '#FFC1B4'
  },
  card: { 
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: 'white',
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
  button: { 
    backgroundColor: '#F38C79',
    borderRadius: 8,
    marginTop: 16,
    paddingVertical: 4
  }
});