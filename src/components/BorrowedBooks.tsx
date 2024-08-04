import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { BookContext } from './BookDetails'; 
const Borrowed = () => {
  const { borrowedBooks, returnBook } = React.useContext(BookContext)!;

  const handleReturn = (bookId: string) => {
    returnBook(bookId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <Button title="Return Book" onPress={() => handleReturn(item.id)} />
          </View>
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

export default Borrowed;
