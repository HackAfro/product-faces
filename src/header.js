import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { SortContext } from './sort.provider';

const Header = ({ onSortValueChanged }) => {
  const data = [
    {
      label: 'Id',
      value: 'id',
    },
    {
      label: 'Size',
      value: 'size',
    },
    {
      label: 'Price',
      value: 'price',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.child}>
        <Text style={styles.brand}>Products Grid </Text>
      </View>
      <View style={styles.child2}>
        <Dropdown
          style={styles.dropdown}
          label="Sort"
          data={data}
          onChangeText={onSortValueChanged}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 2,
  },
  child: {
    flex: 1,
    width: '20%',
  },
  brand: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  child2: {
    width: '20%',
    margin: 0,
  },
  dropdown: {
    margin: 0,
    padding: 0,
  },
});

Header.propTypes = {
  onSortValueChanged: PropTypes.func.isRequired,
};

export default Header;
