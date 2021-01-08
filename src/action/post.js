

import database from '@react-native-firebase/database'


import { SET_POST, ERROR_POST } from './action.types'

export const getPost = (userDetails) => async (dispatch) => {
               
  try {
       
    database()
      .ref(`/users/${userDetails.uid}/following`)
      .on('value', (snapshot) => {
        console.log('data ', Object.keys(snapshot.val()).filter(key => key !== 'fin'));

        if (snapshot.val()) {
          
          let arr = Object.keys(snapshot.val()).filter(
            (key) => key !== 'fin',
          )
          
          database()
            .ref('/users/')
            .on('value',(snapshot) => {
             const data = [];
              arr.forEach((key) => {
                let c = snapshot.child(key)
                
                data.push(c.child('postss').val());
               
              })
              console.log('how do usss',Object.values(data))
              dispatch({ type: SET_POST, payload: Object.values(data) });
                         
            })
          
        }
      })
    
    
    
     
  }
                
            

          
                
                // dispatch({ type: SET_POST, payload: Object.values(postd) });
              
                  
                // const postd = []
                // Object.values(snapshot.val()).forEach((val) => {
                //   if (val.postss ) {
                //     postd.push(val.postss);
                //   }
                // })
                // if (postd[0]) {
                //    dispatch({type: SET_POST, payload: Object.values(postd)});
                // } else {
                //   dispatch({type: SET_POST, payload: []});
                // }
                 
                
              // }
             
              //  else {
              //   dispatch({type: SET_POST, payload: []});
              // }
            
        
        
        
     catch (error) {
        dispatch({ type: ERROR_POST })
    }
};

