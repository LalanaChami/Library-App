import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase';
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
        <Card.Content>
          <Title style={styles.title}>{book.title}</Title>
          <Paragraph>Author: {book.author}</Paragraph>
          <Paragraph>Published: {book.publishedYear}</Paragraph>
          <Paragraph>Status: {book.isBorrowed ? 'Borrowed' : 'Available'}</Paragraph>
          <Paragraph style={styles.description}>{book.description}</Paragraph>
        </Card.Content>
      </Card>

      {!book.isBorrowed && (
        <Button 
          mode="contained" 
          style={styles.button}
          onPress={handleBorrow}
        >
          Borrow Book
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 24, marginBottom: 10 },
  description: { marginTop: 10 },
  button: { marginTop: 20 }
});