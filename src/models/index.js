const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const app = express();

module.exports = {
    express,
    morgan,
    cors,
    bcrypt,
    jwt,
    prisma,
    app,
}