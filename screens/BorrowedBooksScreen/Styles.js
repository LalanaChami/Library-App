import { StyleSheet } from 'react-native';

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

export default styles;