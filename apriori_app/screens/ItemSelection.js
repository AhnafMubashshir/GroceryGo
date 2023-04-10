import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'onlineGrocery.db' });

const ItemSelection = ({ route }) => {
    const [quantity, setQuantity] = useState(0);
    const [items, setItems] = useState([]);
    const navigation = useNavigation();


    const updateQuantity = async (newQuantity) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM shops WHERE shopName = ? AND itemName = ?',
                [route.params.shopName, route.params.itemName],
                (tx, results) => {
                    console.log('Query completed');
                    const rows = results.rows.raw();
                    const selectedItem = rows[0];
                    const itemPrice = selectedItem.price * newQuantity;
                    const updatedQuantity = selectedItem.quantity - newQuantity;

                    tx.executeSql(
                        'UPDATE shops SET quantity = ? WHERE id = ?',
                        [updatedQuantity, selectedItem.id],
                        () => { },
                        error => {
                            console.error(error);
                        }
                    );

                    const cart = {
                        itemName: route.params.itemName,
                        quantity: newQuantity,
                        price: itemPrice,
                    };

                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS cart (itemName TEXT, quantity INT, price REAL);',
                        [],
                        (tx, results) => { },
                        error => console.log('Error creating items table: ', error),
                    );

                    tx.executeSql(
                        'INSERT INTO cart (itemName, quantity, price) VALUES (?, ?, ?)',
                        [cart.itemName, cart.quantity, cart.price],
                        () => { },
                        error => {
                            console.error(error);
                        }
                    );

                    navigation.goBack();
                },
                error => {
                    console.error(error);
                }
            );
        });
    };


    const incrementQuantity = () => {
        if (route.params.itemQuantity - quantity > 0 ) {
            const newQuantity = quantity + 1;
            setQuantity(newQuantity);
        }
    };

    const decrementQuantity = () => {
        const newQuantity = quantity > 0 ? quantity - 1 : 0;
        setQuantity(newQuantity);
    };

    const handleSubmit = () => {
        updateQuantity(quantity);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{route.params.itemName}</Text>
            </View>
            <View style={styles.item}>
                <Text style={styles.itemName}>Quantity:</Text>
                <TouchableOpacity onPress={decrementQuantity}>
                    <Text style={styles.button}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={incrementQuantity}>
                    <Text style={styles.button}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
        marginVertical: 3,
    },
    itemName: {
        color: 'black',
        fontWeight: 'bold',
        marginRight: 10,
    },
    quantity: {
        paddingHorizontal: 10,
        fontSize: 18,
        color: 'black',
    },
    button: {
        color: 'blue',
        fontSize: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginTop: 20,
        alignSelf: 'center',
        width: '50%',
    },
});

export default ItemSelection;
