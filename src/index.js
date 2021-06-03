const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');
const { query } = require('express');
const methodOverride = require('method-override')


const SortMiddleware = require('./app/middlewares/SortMiddlewares');


const app = express();
const port = 3000;
const routes = require('./routes');
const route = require('./routes');
const db = require('./config/db/')


// Connect to DB
db.connect();

app.use(methodOverride('_method'))


// Custom middleware
app.use(SortMiddleware);


app.use(express.static(path.join(__dirname, 'public'))); //public thu muc
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
//HTTP LOGGER
//app.use(morgan('combined'));

// Template engines
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                    const sortType = field === sort.column ? sort.type : 'default';


                    const icons = {
                        default: 'oi oi-elevator',
                        asc : 'oi oi-sort-ascending',
                        desc : 'oi oi-sort-descending'
                    };

                    const types = {
                            default: 'desc',
                            asc: 'desc',
                            desc: 'asc',
                    };


                    const icon = icons[sortType]
                    const type = types[sortType]

                    return  `  <a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                  </a>`;


            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));


// Home, search, contact

//Routes init
route(app);

app.listen(port, () => {
    console.log(` App listening at http://localhost:${port}`);
});


