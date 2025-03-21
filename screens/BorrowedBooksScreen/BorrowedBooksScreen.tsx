import { useEffect, useState } from 'react';
import { View, FlatList, Alert, Image } from 'react-native';
import { Card, Title, Button } from 'react-native-paper';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase';
import styles from './Styles';

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
              resolve({ id: bookId, ...bookSnap.val() })
            )
          )
        )
      ).then((books) => {
        // console.log(books as any[]);
        setBorrowedBooks(books as any[]);
      });
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
            <Card.Content style={{ padding: 16, flexDirection: 'row' }}>
              <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.image} 
              />
              <View style={{ flex: 1 }}>
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
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};