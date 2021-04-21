import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet ,Text} from 'react-native';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      email: '',
      password:'',
      gender:''
    };
  }
  
  onRegister = async () =>{
          const URL = "http://localhost:3012/register";
          const body = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            gender:this.state.gender
          }
          await axios.post(URL,body).then(
            res=>{
            console.log(res);
            }
          ).then(
            Alert.alert('Registration Completed')
          )
        this.setState({name:''});
        this.setState({email:''});
        this.setState({password:''});
        this.setState({gender:''});

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
          placeholder={'name'}
          style={styles.input}
        />
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'email'}
          style={styles.input}
        />
         <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'password'}
          secureTextEntry={true}
          style={styles.input}
        />
         <TextInput
          value={this.state.gender}
          onChangeText={(gender) => this.setState({ gender })}
          placeholder={'gender'}
          style={styles.input}
        />
        
        <Button
          title={'Registration'}
          style={styles.input}
          onPress={()=>this.onRegister.bind(this)}
        />
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
