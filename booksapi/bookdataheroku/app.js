const express = require('express');
const app = express();
const fs = require('fs');
const ejs = require('ejs');
let books = require('./booksdata/books.json');


app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('submit')
});


app.get('/books',(req,res)=>{
    res.send(books)
});

app.get('/book/:id',(req,res)=>{
    const {id} = req.params;
    const booksdata = books.filter((book)=>book.id == id);
    res.send(booksdata)
});

app.post('/book',(req,res)=>{
    const postbook = req.body;
    console.log(postbook)
    books.push(postbook);
    fs.writeFile('./booksdata/books.json',JSON.stringify(books),(err)=>{
        if(err){
            res.send(err)
        }
        res.send('bookdata posted successfully');
    });
});

app.put('/book/:id',(req,res)=>{
    const {id} = req.params;
    const updatebook = req.body;
    books.forEach((book) => {
        if (book.id == id) {
        book.name = updatebook.name;
        book.year= updatebook.year;
        book.author = updatebook.author;
        }
    });
    fs.writeFile('./booksdata/books.json',JSON.stringify(books),(err)=>{
        if(err){
            res.send(err)
        }
        res.send(books);
    });
});

app.delete('/book/:id',(req,res)=>{
    const {id} = req.params;
    books = books.filter((book)=>book.id != id);
    fs.writeFile('./booksdata/books.json',JSON.stringify(books),(err)=>{
        if(err){
            res.send(err)
        }
        res.send(books);
    });

})
app.PORT = process.env.PORT || 3012
app.listen(PORT)