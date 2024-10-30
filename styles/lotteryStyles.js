// lotteryStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293133',
  },
  header: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  tickets: {
    fontSize: 20,
    color: '#f2f2f2',
  },
  imageContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    paddingBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  spinButton: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    
  },
  spinButtonText: {
    color: '#293133',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
