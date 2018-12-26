import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import ProductItem from './item';
import { SortContext } from './sort.provider';

const BASE_URI = 'https://2e0c78be.ngrok.io/';

class ProductsList extends PureComponent {
  static contextType = SortContext;

  state = {
    products: [],
    page: 1,
    limit: 20,
    loading: true,
    footerText: 'Loading ...',
    allProductsLoaded: false,
  };

  prevAd = '';

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps) {
    const { sortBy } = this.props;
    if (sortBy !== prevProps.sortBy) {
      this.setState({ loading: true });
      this.getProducts(sortBy);
    }
  }

  async getProducts(sort = null) {
    const { limit, page, products: stateProducts } = this.state;
    const params = sort ? `_sort=${sort}` : `_page=${page}&_limit=${limit}`;
    const res = await fetch(`${BASE_URI}api/products?${params}`, {
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await res.json();
    if (!data.length) {
      this.setState({
        footerText: '~ end of catalogue ~',
        allProductsLoaded: true,
      });
      return;
    }
    const dataWithAd = this.setAdsOnProducts(data);
    const products = sort ? dataWithAd : [...stateProducts, ...dataWithAd];
    this.setState({ products, loading: false });
  }

  get getAd() {
    let newAd = `${BASE_URI}ads/?r=${Math.floor(Math.random() * 1000)}`;
    if (newAd === this.prevAd) {
      this.getAd;
    }
    this.prevAd = newAd;
    return newAd;
  }

  setAdsOnProducts(data) {
    const { sortBy } = this.props;
    if (!sortBy) {
      const ad = {
        uri: this.getAd,
        ad: true,
      };
      return [...data, ad];
    }
    data.forEach((item, index) => {
      if (index !== 0 && index % 20 === 0) {
        const start = data.slice(0, index);
        const end = data.slice(index);
        const ad = {
          uri: this.getAd,
          ad: true,
        };
        data = [...start, ad, ...end];
      }
    });

    return data;
  }

  onEndReached = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      () => {
        setTimeout(() => {
          this.getProducts();
        }, 400);
      }
    );
  };

  render() {
    const { products, loading, footerText, allProductsLoaded } = this.state;
    return loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    ) : (
      <View style={styles.listContainer}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={ProductItem}
          onEndReached={() => !allProductsLoaded && this.onEndReached()}
          onEndReachedThreshold={0}
          ListFooterComponent={(_) => (
            <Text style={styles.loading}>{footerText}</Text>
          )}
          numColumns={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  loading: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 7,
  },
  loadingContainer: {
    height: 300,
    width: '100%',
    marginVertical: 120,
    alignItems: 'center',
  },
});

ProductsList.propTypes = {
  sortBy: PropTypes.string.isRequired,
};

export default ProductsList;
