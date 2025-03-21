import { StyleSheet } from 'react-native';

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

   export default styles;