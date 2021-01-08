import React, {useState, useEffect} from 'react';
import {Image, Linking} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import database from '@react-native-firebase/database';
import { Dimensions } from 'react-native';
import PostImage from '../components/PostImage'

const Post = ({ item, userDetails }) => {
  console.log('in post comp',item.id)
  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
 
   useEffect(() => {
    //  console.log(item);

     if (item.vote) {
       let upVote = 0;
       let downVote = 0;

       Object.values(item.vote).map((val) => {
         if (val.upVote) {
           upVote += 1;
         }

         if (val.downVote) {
           downVote += 1;
         }
       });

       setUpvote(upVote);
       setDownvote(downVote);
     }
   }, [item]);


  const upVotePost = () => {
  
    database().ref(`users/${item.userId}/postss/${item.id}/vote/${userDetails.uid}`)
      .set({
      upVote:1
    })


   }
  const downVotePost = () => {
     database()
       .ref(`users/${item.userId}/postss/${item.id}/vote/${userDetails.uid}`)
       .set({
         downVote: 1,
       });
   }
  return (
    <Card
      style={{
        backgroundColor: 'black',
        borderColor: '#424242',

        borderRadius: 5,

        padding: 2,
      }}>
      <CardItem
        style={{
          backgroundColor: 'transparent',
        }}>
        <Left>
          <Thumbnail source={{uri: item.userImage}} small />
          <Body>
            <Text
              style={{
                color: '#fdcb9e',
                fontFamily: 'sans-serif-thin',
              }}>
              {item.by}
            </Text>

            <Text note>{item.location}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody
      style={{backgroundColor:'transparent'}}
      
      >
      <Image
          source={{uri: item.picture}}
          style={{
            width: Dimensions.get('window').width - 7,
            overflow: 'visible',
            height: 400,
          
          }}
     
        />

        {/* <PostImage
          widths={(Dimensions.get('window').width-8)}
          // widths={null}
          source={{uri: item.picture}} */}
        
      </CardItem>
      <CardItem
        cardBody
        style={{
          backgroundColor: 'transparent',
        }}>
        <Text
          numberOfLines={2}
          style={{
            color: '#fff',
            marginLeft: 10,
            fontFamily: 'sans-serif-thin',
          }}>
          {item.description}
        </Text>
      </CardItem>

      <CardItem
        style={{
          backgroundColor: 'black',
        }}>
        <Left>
          <Button transparent onPress={upVotePost}>
            <Icon
              name="thumbs-up"
              type="Entypo"
              style={{fontSize: 20, color: '#fdcb9e'}}
            />
            <Text
              style={{
                color: '#fdcb9e',
              }}>
              {upvote}
            </Text>
          </Button>
          <Button transparent onPress={downVotePost}>
            <Icon
              name="thumbs-down"
              type="Entypo"
              style={{fontSize: 20, color: '#fdcb9e'}}
            />
            <Text
              style={{
                color: '#fdcb9e',
              }}>
              {downvote}
            </Text>
          </Button>
        </Left>
        {/* <Right>
          <Button
            transparent
            iconLeft
            onPress={() => {
              Linking.openURL(`instagram://user?username=${item.instaId}`);
            }}>
            <Text
              style={{
                color: '#fdcb9e',
              }}>
              Open in
            </Text>
            <Icon
              name="instagram"
              type="Feather"
              style={{fontSize: 20, color: '#fdcb9e'}}
            />
          </Button>
        </Right> */}
      </CardItem>
    </Card>
  );
};

export default Post;
