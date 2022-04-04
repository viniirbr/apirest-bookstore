import authors from '../models/Author.js'

export default class AuthorsController {
    static listAuthors = (req, res) => {
        authors.find((error, authors) => {
            res.status(200).json(authors);
        })
    }

    static registerAuthor = (req, res) => {
        let author = new authors(req.body);
        author.save((err) => {
            if(err) {
                res.status(500).send({message: `${err.message}: Falha ao criar arquivo`})
            } else {
                res.status(201).send(author.toJSON())
            }
        })
    }

    static updateAuthor = (req, res) => {
        const id = req.params.id;
        authors.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(!err) {
                res.status(200).send({message: "Autor atualizado com sucesso"});
            } else {
                res.status(500).send({message: err.message});
            }
        })
    }

    static getAuthorById = (req, res) => {
        const id = req.params.id;
        authors.findById(id, (err, authors) => {
            if(err) {
                res.status(400).send({message: `${err.message}: ID não localizado`})
            } else {
                res.status(200).send(authors)
            }
        })
    }

    static deleteAuthor = (req, res) => {
        const id = req.params.id;
        authors.findByIdAndDelete(id, (err) => {
            if(err) {
                res.status(400).send({message: `${err.message}: "Livro não encontrado`})
            } else {
                res.status(200).send({message: "Livro removido com sucesso"})
            }
        })
    }
}