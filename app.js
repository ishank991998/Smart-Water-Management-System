const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
/*
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))
*/

//Connect to Database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected',() =>{    
    console.log('Connected to database ' + config.database);
    
});

//On Error
mongoose.connection.on('error',(err) =>{
    console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

//Port Number
const port =   3000;  //process.env.PORT || 8080;

//CORS Middleware
app.use(cors());

//Set Static folder
app.use(express.static(path.join(__dirname,'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//Index Route 
app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

/*
// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
    resources: [User],
    rootPath: '/admin',
})

const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)
*/
//Start Server
app.listen(port, () => {
    console.log('Server started on port: ' + port );
});

