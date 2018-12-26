import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductList from './src/products';
import Header from './src/header';
export default class App extends React.Component {
  state = {
    sortBy: '',
  };

  onSortValueChanged = (value) => {
    this.setState({
      sortBy: value,
    });
  };

  render() {
    const { sortBy } = this.state;
    return (
      <View style={styles.container}>
        <Header onSortValueChanged={this.onSortValueChanged} />
        <ProductList sortBy={sortBy} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
