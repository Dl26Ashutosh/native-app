import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet ,Text} from 'react-native';
import axios from 'axios';
import Register from './components/registration';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      token:'',
      message:''
    };
  }
  
  onLogin = async () =>{
          const { username, password } = this.state;
          const URL = "http://localhost:3012/login";
          const VR_URL = "http://localhost:3012/protected";
          const body = {
            email:this.state.username,
            password:this.state.password
          }
          await axios.post(URL,body).then(
            res=>{
            this.setState({token:res.data.token})
            }
          )
          await axios.get(VR_URL,{
              headers:{
                token: this.state.token
            }
          }).then((res)=>{ 
            this.setState({message:res.data.message})

          })
          this.setState({username:''})
          this.setState({password:''})
          Alert.alert(this.state.message);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={()=>this.onLogin.bind(this)}
        />
        <Register/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
