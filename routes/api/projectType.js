const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const ProjectType = require('../../models/ProjectType');


// @route Post api/project-type
// @desc  Crea un nuevo tipo de proyecto
// @access Private
router.post('/', [auth, [
    check('name', 'El nombre del tipo de proyecto es obligatoria').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty()
] ], 
async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({ errors: errors.array() });
    }

    const {name, description} = req.body;

    try {

        let proyectType = new ProjectType({
            name, description 
        });

        await proyectType.save();

        return res.status(200).json({msg: 'El tipo de proyecto fue insertado correctamente.'});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: ' + err.message);
    }

});

// @route GET api/proyect-type/getAll
// @desc  Obtiene los tipos de proyecto
// @access Private
router.get('/getAll', async (req, res) => {

    try {
        let proyectType = await ProjectType.find();
        res.json(proyectType);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: ' + err.message);
    }
});


// @route POST api/proyect-type/delete
// @desc  delete a project-type by id
// @access Public
router.post('/delete', [
    check('id', 'Id es requerido').not().isEmpty()
], async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.body.id;

    try {

        let proyectType = await ProjectType.findById(id);

        if(!proyectType){
            res.status(404).json({errors: [{msg: "El tipo de proyecto a eliminar no existe"}]});
        }

        await ProjectType.findOneAndRemove({_id: id});

        res.json({msg: 'Tipo de proyecto eliminado'});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: ' + err.message);
    }

});


module.exports = router;