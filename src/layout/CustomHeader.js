import React from 'react';
import {
  Text,
  Button,
  Body,
  Right,
  Icon,
  Header,
  Input,
  Title
} from 'native-base'

import {signOut} from '../action/auth'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

const CustomHeader = ({ authState, signOut, navigation }) => {
  
  return (
    <Header androidStatusBarColor="black" style={{backgroundColor: 'black'}}>
      <Body>
        <Title style={{marginLeft: 10, fontFamily: 'sans-serif-thin'}}>
          NEgram
        </Title>
      </Body>
      <Right>
        {authState.isAuthenticated && (
          <>
            {/* <Button
              transparent
              iconLeft
              onPress={() => navigation.navigate('Chats')}>
              <Text style={{color: 'white'}}>CHAT</Text>
            </Button> */}

            {/* <Button
              transparent
              
              onPress={() => navigation.navigate('Search')}>
              <Text style={{color: 'white'}}>search</Text>
            </Button>
            <Button
              transparent
              iconLeft
              onPress={() => navigation.navigate('AddPost')}>
              <Text style={{color: 'white'}}>AddPost</Text>
            </Button>
            <Button
              transparent
              iconLeft
              onPress={() => navigation.navigate('UserProfile')}>
              <Text style={{color: 'white'}}>Profile</Text>
            </Button> */}
            <Button transparent onPress={() => signOut()}>
              <Icon name="log-out-outline" styles={{color: 'red'}} />
            </Button>
          </>
        )}
      </Right>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  authState:state.auth
})
const mapDispatchToProps = {
  signOut
}

CustomHeader.propTypes = {
  signOut: propTypes.func.isRequired,
  authState: propTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader)
