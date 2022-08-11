const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const connectDB = require('./config/db')

// import router
const postRouter = require('./routes/post')

// khoi dong app
const app = express()

// Khoi dong Handlebars middleware
app.engine('handlebars', exphbs.engine({ extname: 'handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars')

// khoi dong bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Khoi dong methodOverride middleware
app.use(methodOverride('_method'))

// khoi dong express middleware
app.use(express.json())

// Ket noi csdl
connectDB()

// Một số routes cơ bản, có thể đưa vào file riêng trong thư mục routes
app.get('/', (req, res) => res.render('index'))
app.get('/about', (req, res) => res.render('about'))

// Mang routes vao de su dung
app.use('/posts', postRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server khoi dong tai port ${PORT}`))