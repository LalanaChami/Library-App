import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../../firebase';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';

export const BookDetailsScreen = ({ route, navigation }: { route: any, navigation: NavigationProp<any> }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState<any>(null);
  const [borrowedCount, setBorrowedCount] = useState(0);

  useEffect(() => {
    const bookRef = ref(db, `books/${bookId}`);
    const userRef = ref(db, 'users/defaultUser/borrowedBooks');

    onValue(bookRef, (snapshot) => setBook(snapshot.val()));
    onValue(userRef, (snapshot) => setBorrowedCount(snapshot.size));
  }, []);

  const handleBorrow = async () => {
    if (borrowedCount >= 3) {
      Alert.alert('Limit Exceeded', 'You can borrow maximum 3 books at a time');
      return;
    }

    const updates = {
      [`books/${bookId}/isBorrowed`]: true,
      [`users/defaultUser/borrowedBooks/${bookId}`]: true
    };

    try {
      await update(ref(db), updates);
      Alert.alert('Success', 'Book borrowed successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to borrow book');
    }
  };

  if (!book) return null;

  return (
    <View style={styles.container}>
      <Card>
      <Card.Cover source={{ uri: book.imageUrl }} style={styles.coverImage}/>
      <Card.Content>
        <Title style={styles.title}>{book.title}</Title>
        <Paragraph style={styles.detailText}>Author: {book.author}</Paragraph>
        <Paragraph style={styles.detailText}>Published: {book.publishedYear}</Paragraph>
        <Paragraph style={[styles.detailText, { 
          color: book.isBorrowed ? '#F38C79' : '#007074',
          fontWeight: '700'
        }]}>
          Status: {book.isBorrowed ? 'Borrowed' : 'Available'}
        </Paragraph>
        <Paragraph style={styles.description}>{book.description}</Paragraph>
      </Card.Content>
      </Card>

      {!book.isBorrowed && (
        <Button 
          mode="contained" 
          style={styles.button}
          labelStyle={{ color: 'white', fontWeight: '600' }}
          onPress={handleBorrow}
        >
          Borrow This Book
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 16,
    backgroundColor: '#FFC1B4'
  },
  title: { 
    fontSize: 28, 
    color: '#034C53',
    fontWeight: '800',
    marginVertical: 16
  },
  description: { 
    fontSize: 16,
    lineHeight: 24,
    color: '#034C53',
    marginVertical: 16
  },
  button: { 
    backgroundColor: '#F38C79',
    borderRadius: 8,
    margin: 16,
    paddingVertical: 6
  },
  coverImage: {
    height: 320,
    resizeMode: 'contain',
    backgroundColor: '#00707420',
    margin: 16,
    borderRadius: 8
  },
  detailText: {
    fontSize: 16,
    color: '#007074',
    marginVertical: 4,
    fontWeight: '500'
  }
});