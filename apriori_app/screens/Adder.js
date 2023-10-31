// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from 'react-native';
// import { NativeModules } from 'react-native';

// const { AdditionModule } = NativeModules;

// const Adder = () => {
//   const data = [
//   ["chicken", "lettuce", "tomato", "onion"],
//   ["lettuce", "tomato", "cucumber", "carrot", "olive oil"],
//   ["bread", "butter", "honey", "milk"],
//   ["cheese", "crackers", "grapes", "orange"],
//   ["chicken", "lettuce", "tomato", "olive oil"],
//   ["lettuce", "tomato", "cucumber", "onion"],
//   ["yogurt", "granola", "blueberries"],
//   ["coffee", "sugar", "cream"],
//   ["tea", "honey", "lemon"],
//   ["water", "lemon"],
//   ["pizza", "pepperoni", "mushroom", "green pepper", "onion", "tomato sauce"],
//   ["pasta", "meatballs", "tomato sauce", "cheese"],
//   ["salmon", "asparagus", "lemon", "butter"],
//   ["spaghetti", "tomato sauce", "garlic", "parmesan cheese"],
//   ["steak", "potatoes", "green beans"],
//   ["chicken", "rice", "peas", "carrots", "soy sauce"],
//   ["hamburger", "lettuce", "tomato", "pickle", "cheese"],
//   ["fries", "ketchup"],
//   ["sandwich", "ham", "cheese", "lettuce", "mayonnaise"],
//   ["sushi", "soy sauce", "wasabi", "ginger"],
//   ["taco", "beef", "lettuce", "tomato", "sour cream"],
//   ["chicken", "broccoli", "carrots", "garlic", "olive oil"],
//   ["salad", "lettuce", "tomato", "cucumber", "carrot", "olive oil", "balsamic vinegar"],
//   ["chicken", "spinach", "mushroom", "garlic", "olive oil"],
//   ["pork", "apple", "cinnamon", "honey"],
//   ["fajitas", "beef", "onion", "green pepper", "lettuce", "tomato", "sour cream"],
//   ["nachos", "beef", "cheese", "sour cream", "guacamole"],
//   ["shrimp", "rice", "garlic", "lemon"],
//   ["burrito", "beef", "rice", "beans", "lettuce", "tomato", "sour cream"],
//   ["meatloaf", "potatoes", "carrots"],
//   ["chicken", "potatoes", "carrots", "garlic", "rosemary"],
//   ["fish", "chips", "tartar sauce"],
//   ["spaghetti", "meat sauce", "garlic", "parmesan cheese"],
//   ["chicken", "corn", "beans", "rice", "salsa"],
//   ["lasagna", "meat sauce", "ricotta cheese", "mozzarella cheese"],
//   ["frittata", "eggs", "potatoes", "onion", "peppers", "cheese"],
//   ["chicken", "lettuce", "tomato", "onion", "hummus"],
//   ["tuna salad", "lettuce", "tomato", "cucumber"],
//   ["chicken", "asparagus", "lemon", "garlic"]
//   ];

//   const minSupport = 0.3;
//   const minConfidence = 0.7;

//   const [num1, setNum1] = useState('');
//   const [num2, setNum2] = useState('');
//   const [result, setResult] = useState('');

//   const handleAddition = () => {
//     AdditionModule.addAlgo(data)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <View style={{ padding: 16 }}>
//       <Text>Enter two numbers to add:</Text>
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 8 }}
//         placeholder="Number 1"
//         onChangeText={setNum1}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 8 }}
//         placeholder="Number 2"
//         onChangeText={setNum2}
//         keyboardType="numeric"
//       />
//       <Button title="Add" onPress={handleAddition} />
//       <Text style={{ marginVertical: 8 }}>Result: {result}</Text>
//     </View>
//   );
// };

// export default Adder;
