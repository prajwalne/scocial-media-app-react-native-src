import React,{useState,useEffect,useRef} from 'react'
import { View, Image, StyleSheet } from 'react-native'



 

const makeCancelable = (promise) => {
   let isCancel = false;
   const wrappedPromise = new Promise((resolve, reject) => {
     promise.then((val) => {
       isCancel ? reject({isCancel: true}) : resolve(val);
     });
     promise.catch((error) =>
       isCancel ? reject({isCancel: true}) : reject(error),
     );
   });
  
   return {
     promise: wrappedPromise,
     cancel() {
       isCancel = true;
     },
   };
};
 
 


const PostImage = ({ source, widths }) => {
  
    const [height, setHeight] = useState()
       const myPromise = new Promise((resolve, reject) => {
     Image.getSize(source.uri, (width, height) => {
       let heights = (height / width) * widths;
       resolve(heights);
     });
   });
  
        
  useEffect(() => {
      

   
  const request = makeCancelable(myPromise)
      request.promise.then((val) => {
      val<=500?setHeight(val):setHeight(400)
      }).catch(({isCancel, ...error}) => console.log('isCanceled', isCancel));
      // request.promise.then((val) => {setHeight(val)})
     return () => {
         request.cancel()
     }
      
    }, []);
    
    return (
        <View  >
            <Image
                source={ source }
                style={{ height: height, width: widths, flex: 1 }}
              // resizeMode="contain"
            />
            
        </View>

)

    

}

export default PostImage;