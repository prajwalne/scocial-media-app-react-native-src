import React from 'react'
import { View, Text,Image,StyleSheet,TouchableOpacity} from 'react-native'


const SearchComponent = ({navigation, name, username, image }) => {
  
  return (
   
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            style={{height: 50, width: 50, borderRadius: 150}}
          />
        </View>

        <View style={styles.textDetailsContainer}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
  
  );
}

export default SearchComponent;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#1b1b1b',
    margin:5
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 150,
  },
  textDetailsContainer: {marginLeft: 10},
  name: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'sans-serif-thin',
  },
  username: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
  },
});