import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'onlineGrocery.db' });

const ShopItems = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  const isFocused = useIsFocused(); 

  console.log('====================================');
  console.log(items);
  console.log('====================================');

  useEffect(() => {
    if (isFocused) {
      handleLoad();
    }
  }, [isFocused]);

  const handleLoad = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT itemName, quantity, price FROM shops where shopName = ?',
        [route.params.shopName],
        (tx, results) => {
            console.log('Query completed');
            const rows = results.rows.raw();
            const shops = rows.map(row => ({
              itemName: row.itemName,
              quantity: row.quantity,
              price: row.price,
            }));

          setItems(shops);
        },
        error => {
          console.error(error);
        }
      );
    });
  };

  const handleItemPress = (item) => {
    navigation.navigate('ItemSelection', {
      itemName: item.itemName,
      itemQuantity: item.quantity,
      shopName: route.params.shopName,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{route.params.shopName} Items</Text>
      </View>
      {items.map((item) => (
        <TouchableOpacity
          key={item.itemName}
          style={styles.item}
          onPress={() => handleItemPress(item)}
        >
          <Text style={styles.itemName}>{item.itemName}</Text>
          <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
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
  item: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  itemName: {
    color: 'black',
    fontWeight: 'bold',
  },
  itemQuantity: {
    color: 'black',
  },
});

export default ShopItems;
