const { date } = require('joi');
const {prisma} = require('../src/models')
const {owner,users,categoryFoods,restaurants, menu,categoryRestaurants} = require('./mockup')


console.log('DB seed .....');

async function run() {
    await prisma.user.createMany({data: owner})
    await prisma.user.createMany({data: users})
    await prisma.category.createMany({data: categoryFoods})
    await prisma.categoryRestaurant.createMany({data: categoryRestaurants})
    await prisma.store.createMany({data: restaurants})
    await prisma.menu.createMany({data:menu})
}

run()