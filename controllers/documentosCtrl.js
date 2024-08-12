const Documentos = require('../database/models/documentosModel');
const cloudinary = require('../lib/cloudinary');
const Cliente = require('../database/models/clienteModel');

const DocumentosCtrl = {
    getAllDocumentos: async (req, res) => {
        try {
            const documentos = await Documentos.findAll({
                include: [{
                    model: Cliente,
                }]
            });
            res.json(documentos);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getOneDocumento: async (req, res) => {
        try {
            const { id } = req.params;
            const documento = await Documentos.findById(id, {
                include: [{
                    model: Cliente,
                }]
            });
            res.json(documento);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    addDocumento: async (req, res) => {
        try {
            const { nombre_documento, tipo_contrato, fecha_termino, clienteIdCliente } = req.body;
            const result = await cloudinary.uploader.upload(req.file.path);

            await Documentos.build({ nombre_documento, tipo_contrato, documento: result.secure_url,
                cloudinary_id: result.public_id, fecha_termino, clienteIdCliente }).save().then(documento => {
                res.status(201).json(documento);
            }).catch(error => {
                return res.status(500).json({ message: error.message });
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = DocumentosCtrl;