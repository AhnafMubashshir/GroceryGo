import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({ name: 'onlineGrocery.db' })

const Clear = () => {
    const handleClear = () => {

        db.transaction((tx) => {
            tx.executeSql('DROP TABLE IF EXISTS cart', [], (tx, results) => {
                console.log('Cart table deleted successfully');
            });
        });
    }

        return (
            <View style={styles.container}>
                <Button title="Clear All" onPress={handleClear} />
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            padding: 20,
        },
    });

    export default Clear;
