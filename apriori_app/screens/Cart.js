import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { Table, Row, TableWrapper, Col } from 'react-native-table-component';

const db = openDatabase({ name: 'onlineGrocery.db' });

const Cart = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [netTotal, setNetTotal] = useState(0);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM cart',
                [],
                (tx, results) => {
                    console.log('Query completed');
                    const rows = results.rows.raw();
                    const cart = rows.map(row => ({
                        itemName: row.itemName,
                        quantity: row.quantity,
                        price: row.price,
                    }));

                    setCartItems(cart);
                    setNetTotal(cart.reduce((acc, item) => acc + item.price, 0));
                });
        });
    }, []);

    const handleBuy = () => {
        Alert.alert(
            'Buy Confirmation',
            'Are you sure you want to buy these items?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Buy',
                    onPress: () => {
                        db.transaction(tx => {
                            tx.executeSql(
                                'DELETE FROM cart',
                                [],
                                (tx, results) => {
                                    console.log('Cart items deleted');
                                    setCartItems([]);
                                    setNetTotal(0);
                                    Alert.alert('Success', 'Items bought successfully');
                                    navigation.navigate('Home');
                                },
                                error => console.log('Error while deleting cart items', error)
                            );
                        });
                    },
                },
            ]
        );
    };

    const tableHead = ['Item Name', 'Quantity', 'Price'];
    const tableData = cartItems.map(item => [item.itemName, item.quantity, item.price]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cart</Text>
            {cartItems.length > 0 ? (
                <Table>
                    <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                    {cartItems.map((item, index) => (
                        <Row key={index} data={[item.itemName, item.quantity, item.price]} textStyle={styles.text} />
                    ))}
                    <TableWrapper style={styles.footer}>
                        <Col data={['Net Total']} style={styles.footerCol} heightArr={[40]} textStyle={styles.footerText} />
                        <Col data={[`${netTotal.toFixed(2)} taka`]} style={styles.footerCol} heightArr={[40]} textStyle={styles.footerText} />
                    </TableWrapper>
                </Table>
            ) : (
                <Text style={styles.emptyText}>Your cart is empty.</Text>
            )}
            {cartItems.length > 0 && (
                <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
                    <Text style={styles.buyButtonText}>Buy</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
      backgroundColor: '#fff'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: 'black',
    },
    head: {
      height: 40,
      backgroundColor: '#f1f8ff'
    },
    headText: {
      margin: 6,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
    },
    text: {
      margin: 6,
      textAlign: 'center',
      color: 'black',
    },
    footer: {
      flexDirection: 'row',
      backgroundColor: '#f1f8ff',
      marginTop: 10
    },
    footerCol: {
      flex: 1,
      margin: 6,
      textAlign: 'center'
    },
    footerText: {
      fontWeight: 'bold',
      color: 'black',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 16,
      color: 'black',
    },
    buyButton: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginTop: 20
    },
    buyButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold'
    }
  });
  

export default Cart;
