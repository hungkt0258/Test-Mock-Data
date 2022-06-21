// var faker = require('faker');

// var database = { products: [] };

// for (var i = 1; i <= 300; i++) {
//   database.products.push({
//     id: i,
//     name: faker.commerce.productName(),
//     description: faker.lorem.sentences(),
//     price: faker.commerce.price(),
//     imageUrl: 'https://source.unsplash.com/1600x900/?product',
//     quantity: faker.random.number(),
//   });
// }

// console.log(JSON.stringify(database));

var faker = require('faker');
var fs = require('fs');

var database = { products: [] };

// ID, Name, Type, Category, Price
for (var i = 1; i <= 300; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    type: faker.animal.Type(),
    category: faker.commerce.department(),
    price: faker.commerce.price(),
  });
}

var json = JSON.stringify(database);
fs.writeFile('server/database.json', json, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('database.json created');
});
