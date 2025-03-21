import { StyleSheet } from 'react-native';

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

export default styles;