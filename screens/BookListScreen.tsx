import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
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
        labelStyle={styles.buttonLabel}
        onPress={() => navigation.navigate('BorrowedBooks')}
      >
        My Borrowed Books
      </Button>
      
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} 
                onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}>
            <Image 
              source={{ uri: item.imageUrl }} 
              style={styles.bookImage}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">
                By {item.author}
              </Text>
              <Text style={[
                styles.status,
                item.isBorrowed ? styles.borrowedStatus : styles.availableStatus
              ]}>
                {item.isBorrowed ? 'Borrowed' : 'Available'}
              </Text>
            </View>
          </TouchableOpacity>
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
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    elevation: 2,
    shadowColor: '#034C53',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 4,
    marginRight: 16
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#034C53',
    marginBottom: 4
  },
  author: {
    fontSize: 14,
    color: '#007074',
    marginBottom: 8
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  availableStatus: {
    backgroundColor: '#00707420',
    color: '#007074'
  },
  borrowedStatus: {
    backgroundColor: '#F38C7920',
    color: '#F38C79'
  },
  button: {
    backgroundColor: '#034C53',
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 6
  },
  buttonLabel: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15
  }
});
