require('dotenv').config()
const {prisma} = require('../src/models')


async function run() {
    await prisma.$executeRawUnsafe('DROP DATABASE bro')
    await prisma.$executeRawUnsafe('CREATE DATABASE bro')
}

console.log('Rest DB ...');
run()