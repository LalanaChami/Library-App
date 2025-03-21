import { useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { NavigationProp } from '@react-navigation/native';
import styles from './Styles';

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


