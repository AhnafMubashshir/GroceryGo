import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'onlineGrocery.db' });

const AddItems = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shop, setShop] = useState('');
    const [price, setPrice] = useState('');

    const handleAdd = () => {
        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity)) {
            throw new Error('Quantity must be a number');
        }
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            throw new Error('Price must be a number');
        }
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS shops (id INTEGER PRIMARY KEY AUTOINCREMENT, shopName TEXT, itemName TEXT, quantity INT, price REAL);',
                [],
                (tx, results) => { },
                error => console.log('Error creating items table: ', error),
            );
            tx.executeSql(
                'SELECT * FROM shops WHERE shopName = ? AND itemName = ?',
                [shop, name],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        const row = results.rows.item(0);
                        const newQuantity = row.quantity + parsedQuantity;
                        const newPrice = parsedPrice;
                        tx.executeSql(
                            'UPDATE shops SET quantity = ?, price = ? WHERE id = ?',
                            [newQuantity, newPrice, row.id],
                            (tx, results) => {
                                console.log('Results: ', results.rowsAffected);
                                if (results.rowsAffected > 0) {
                                    setName('');
                                    setQuantity('');
                                    setShop('');
                                    setPrice('');
                                    console.log('Update complete');
                                } else {
                                    console.log('Input failed');
                                }
                            },
                            error => console.log('Error updating item: ', error),
                        );
                    } else {
                        tx.executeSql(
                            'INSERT INTO shops (shopName, itemName, quantity, price) VALUES (?, ?, ?, ?)',
                            [shop, name, parsedQuantity, parsedPrice],
                            (tx, results) => {
                                console.log('Results: ', results.rowsAffected);
                                if (results.rowsAffected > 0) {
                                    setName('');
                                    setQuantity('');
                                    setShop('');
                                    setPrice('');
                                    console.log('Input complete');
                                } else {
                                    console.log('Input failed');
                                }
                            },
                            error => console.log('Error inserting item: ', error),
                        );
                    }
                },
                error => console.log('Error selecting item: ', error),
            );
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add a Food Item</Text>
            <TextInput
                style={[styles.input, { placeholderTextColor: 'black' }]}
                value={shop}
                onChangeText={text => setShop(text)}
                placeholder="Shop Name"
            />
            <TextInput
                style={[styles.input]}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Item Name"
            />
            <TextInput
                style={[styles.input, { placeholderTextColor: 'black' }]}
                value={quantity}
                onChangeText={text => setQuantity(text)}
                placeholder="Quantity"
                keyboardType="numeric"
            />
            <TextInput
                style={[styles.input, { placeholderTextColor: 'black' }]}
                value={price}
                onChangeText={text => setPrice(text)}
                placeholder="Price per unit"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={handleAdd}>
                <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#123456',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        width: '100%',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddItems;
