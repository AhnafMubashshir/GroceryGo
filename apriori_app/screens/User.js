import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { useIsFocused } from '@react-navigation/native';

const User = ({ navigation }) => {
  const [shops, setShops] = useState([]);
  const isFocused = useIsFocused();
  const db = openDatabase({ name: 'onlineGrocery.db' });

  useEffect(() => {
    if (isFocused) {
      handleLoad();
    }
  }, [isFocused]);

  const handleLoad = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT DISTINCT shopName FROM shops',
        [],
        (tx, results) => {
          console.log('Query completed');
          const rows = results.rows.raw();
          const shops = rows.map(row => ({
            name: row.shopName,
          }));

          console.log('====================================');
          console.log(shops);
          console.log('====================================');
          setShops(shops);
        },
        error => {
          console.error(error);
        }
      );
    });
  };

  const handleShopPress = (shopName) => {
    console.log(shopName);
    navigation.navigate('ShopItems', { shopName: shopName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shops</Text>
        <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.cartButtonText}>Cart</Text>
        </TouchableOpacity>
      </View>
      {shops.map(shop => (
        <TouchableOpacity key={shop.name} style={styles.shop} onPress={() => handleShopPress(shop.name)}>
          <Text style={styles.shopName}>{shop.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  cartButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
  },
  cartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shop: {
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default User;
