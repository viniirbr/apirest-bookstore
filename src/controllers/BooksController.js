import books from '../models/Book.js'

export default class BooksController {
    static listBooks = (req, res) => {
        books.find()
            .populate('author', 'name')
            .exec((err, books) => {
                res.status(200).json(books)
            })
    }

    static registerBook = (req, res) => {
        let book = new books(req.body);
        book.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message}: Falha ao criar arquivo`})
            } else {
                res.status(201).send(book.toJSON())
            }
        })
    }

    static updateBook = (req, res) => {
        const id = req.params.id;
        books.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: "Livro atualziado com sucesso"});
            } else {
                res.status(500).send({message: err.message});
            }
        })
    }

    static getBookById = (req, res) => {
        const id = req.params.id;
        books.findById(id)
        .populate('author')
        .exec((err, books) => {
            if(err) {
                res.status(400).send({message: `${err.message}: ID não localizado`})
            } else {
                res.status(200).send(books)
            }
        })
    }

    static deleteBook = (req, res) => {
        const id = req.params.id;
        books.findByIdAndDelete(id, (err) => {
            if(err) {
                res.status(400).send({message: `${err.message}: "Livro não encontrado`})
            } else {
                res.status(200).send({message: "Livro removido com sucesso"})
            }
        })
    }

    static findPublisher = (req, res) => {
        const publisher = req.query.publisher;
        books.find({"publisher": publisher}, {}, (err, books) => {
            res.status(200).send(books);
        })
    }
}