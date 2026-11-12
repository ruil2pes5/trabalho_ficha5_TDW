const express = require('express');
const router = express.Router();
const Posto = require('../Models/posto');

// [GET] Listar todos os postos 
router.get('/', (req, res) => {
    Posto.find({})
        .then(postos => {
            if (!postos || postos.length === 0) {
                return res.status(404).send("Postos não encontrados"); 
            }
            return res.status(200).json(postos);
        })
        .catch(error => res.status(500).send(error.message));
});

// [GET] Obter posto específico por ID
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    Posto.findOne({ id: idParam }) 
        .then(posto => {
            if (posto == null) {
                return res.status(404).send("Posto não encontrado");
            }
            return res.status(200).json(posto);
        })
        .catch(error => res.status(500).send(error.message));
});

// [POST] Adicionar novo posto 
router.post('/', (req, res) => {
    if (req.body == null) return res.status(400).send();
    
    const { id, local, potenciakw, disponivel } = req.body;
    
    return Posto.create({ id, local, potenciakw, disponivel })
        .then(posto => res.status(201).json(posto))
        .catch(error => res.status(400).send(error.message));
});

// [PATCH] Atualizar parcialmente 
router.patch('/:id', (req, res) => {
    if (req.body == null) return res.status(400).send();
    
    return Posto.updateOne(
        { id: req.params.id },
        { $set: req.body },
        { runValidators: true }
    )
    .then(result => {
        if (!result.matchedCount) return res.status(404).send("Posto não encontrado");
        return res.status(200).json(result);
    })
    .catch(error => res.status(400).send(error.message));
});

// [DELETE] Remover por ID
router.delete('/:id', (req, res) => {
    Posto.deleteOne({ id: req.params.id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send("Posto não encontrado");
            }
            return res.status(200).send("Posto removido com sucesso");
        })
        .catch(error => res.status(400).send(error.message));
});

module.exports = router;