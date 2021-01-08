import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'


 export const signUp = (data) => async (dispatch) => {
    
    const { name, instaUserName, email, bio, password, country, image } = data
     const chats = { in: 'initial' }
     const following={fin:'initial'}
     const followers={fin:'initial'}
     const postss={pin:'initial'}
      

    auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data)
            console.log('Signed Up Successfully')

            database()
              .ref('/users/' + data.user.uid)
              .set({
                name,
                instaUserName,
                bio,
                country,
                image,
                country,
                uid: data.user.uid,
                following,
                followers,
                chats,
                postss,
              })
              .then(() => {
                console.log('Data Set Successfully');
              });
               
            Snackbar.show({
                text: 'Account Created',
                backgroundColor: "Green",
                textColor: "white",
            })
            
        })
        .catch((error) => {
            console.log(error)
            Snackbar.show({
                text: 'Sign Up Failed',
                textColor: 'white',
                backgroundColor:'red'
            })

    })
    
} 

export const signIn = (data) => async (dispatch) => {
    console.log(data)
    const { email, password } = data

    auth().signInWithEmailAndPassword(email, password)
        .then(() => { 
            console.log("Signed Successfully")
            Snackbar.show({
                text: 'Signed In Successfully',
                textColor: 'white',
                backgroundColor:'green',
            })

        })
        .catch((error) => {
            console.log(error)
            Snackbar.show({
                text: 'SignIn Failed'
            })
    })
    
}
 
 export const signOut = () => async (dispatch) => {
    auth().signOut()
        .then(() => {
            console.log('Signed Out Successfully')
            Snackbar.show({
              text: 'Signed Out Successfully',
                textColor: 'white',
                backgroundColor:'blue'
            })
        })
        .catch((error) => {
            console.log(error)
            Snackbar.show({
                text: 'SignOut Failed',
                textColor: 'white',
                backgroundColor:'red'
            })
    })
} 