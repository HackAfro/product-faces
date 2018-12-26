import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import colors from './colors';

const NUM_COL = 2;
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

const getDate = (date) => {
  const today = new Date();
  const productDate = new Date(date);
  const dateDifference = today.getTime() - productDate.getTime();
  const daysAgo = Math.round(dateDifference / MILLISECONDS_IN_DAY);

  if (daysAgo <= 7) {
    return `${daysAgo} days ago`;
  } else {
    return productDate.toDateString();
  }
};

const getPrice = (price) => {
  const divisor = 100;
  return price / divisor;
};

const getFaceColor = () => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
};

const ProductItem = ({ item }) => {
  const color = getFaceColor();

  return item.ad ? (
    <Image
      source={{ uri: item.uri }}
      style={{ width: '100%', height: 150, marginVertical: 5 }}
    />
  ) : (
    <View style={styles.itemView}>
      <View style={styles.imageArea}>
        <Text style={{ fontSize: item.size, color }}>{item.face}</Text>
      </View>
      <View style={styles.detailsArea}>
        <View>
          <Text style={styles.price}>${getPrice(item.price)}</Text>
          <Text style={styles.date}>{getDate(item.date)}</Text>
        </View>
        <View>
          <Text style={styles.size}>{item.size}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    height: 250,
    flex: 1,
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  imageArea: {
    backgroundColor: 'rgba(0,0,0,0.01)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
  },
  detailsArea: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    paddingHorizontal: 10,
  },
  size: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    padding: 6,
    borderRadius: 4,
    color: 'rgba(0,0,0,0.3)',
    fontWeight: 'bold',
  },
  price: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  date: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    color: 'black',
    backgroundColor: '#E8EDE7',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E8EDE7',
    fontWeight: 'bold',
    opacity: 0.8,
    marginVertical: 6,
  },
});

export default ProductItem;
