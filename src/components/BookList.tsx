import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Book, BookContext } from './BookDetails'; 
const BooksList = () => {
  const { books } = React.useContext(BookContext)!;
  const navigation = useNavigation();

  const gotoBookDetails = (book: Book) => {
    navigation.navigate('Book Details', { book });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
         keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => gotoBookDetails(item)}>
            <View style={styles.bookItem}>
              <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
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
  },
  bookItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 16,
  },
});

export default BooksList;
