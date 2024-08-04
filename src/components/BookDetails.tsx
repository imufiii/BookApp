import React, { createContext, useState, ReactNode } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../FirebaseConfig'; 

interface BookDetailsType {
  books: Book[];
  borrowedBooks: Book[];
  borrowBook: (book: Book) => void;
  returnBook: (bookId: string) => void;

}


export interface Book {
  id: string;
  title: string;
  author: string;
  summary: string;
  rating: number;
  isBorrowed?: boolean; 
}



export const BookContext = createContext<BookDetailsType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'books'));
    const booksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Book[];
    
    setBooks(booksData);
    const updatedBooksData = booksData.map(book => ({
      ...book,
      isBorrowed: book.isBorrowed ?? false, 
    }));
  
    setBooks(updatedBooksData);
    const borrowedBooksData = booksData.filter(book => book.isBorrowed);
    setBorrowedBooks(borrowedBooksData);
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const returnBook = async (bookId: string) => {
    const bookToReturn = borrowedBooks.find(book => book.id === bookId);
    if (bookToReturn) {
      const bookRef = doc(FIRESTORE_DB, 'books', bookId);
      try {
        await updateDoc(bookRef, { isBorrowed: false });
        setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
      } catch (error) {
        Alert.alert('Yooo!!! Failed to return the book. Please try again.');
      }
    }
  };

  const borrowBook = async (book: Book) => {
   
    if (borrowedBooks.some(borrowedBook => borrowedBook.id === book.id)) {
      Alert.alert('Ooops!!....You have already borrowed this book.');
      return;
    }
  
    if (borrowedBooks.length < 3) {
      const bookRef = doc(FIRESTORE_DB, 'books', book.id);
      try {
        await updateDoc(bookRef, { isBorrowed: true });
        setBorrowedBooks(prevBooks => [...prevBooks, { ...book, isBorrowed: true }]);
       
      } catch (error) {
        Alert.alert('You have failed to borrow this book. Please try again.');
      }
    } else {
      Alert.alert('Sorry!!!, You cannot borrow more than 3 books at a time.');
    }
  };
  
  
  

  return (
    <BookContext.Provider value={{ books, borrowedBooks, borrowBook, returnBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const BookDetail = () => {
  const route = useRoute<RouteProp<{ BookDetail: { book: Book } }, 'BookDetail'>>();
  const navigation = useNavigation();
  const { book } = route.params;
  const { borrowBook } = React.useContext(BookContext)!;

  const handleBorrow = () => {
    borrowBook(book);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.summaryTitle}>Summary:</Text>
      <Text style={styles.summary}>{book.summary}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <Button title="Borrow this Book" onPress={handleBorrow} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  summary: {
    fontSize: 16,
    marginVertical: 8,
  },
  rating: {
    fontSize: 16,
    marginVertical: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    marginVertical: 8,
  },


});
