const NoteModel = require('../models/notes');

const index = (req, res, next) => {
    NoteModel.find({}, (error, notes) => {
        if(error) {
            res.send(403).json({
                status: false,
                message: 'Notes not found'
            })
            console.log(error)
            next();
        } else {
            res.send(200).json({
                status: true,
                message: 'Note retrieved successful',
                data: notes
            });
        }
    });
}


const create = (req, res) => {

    let title = req.body.title;
    let body = req.body.body;
    let uid = req.body.uid;

    NoteModel.create({
        title: title,
        body: body,
        uid: uid
    }, (error, notes) => {
        if(error) {

            res.json({
                status: false,
                message: 'Could not save the note!',
                data: error
            });
        } else {

            res.json({
                status: true,
                message: 'Note saved successfully!',
                data: notes
            });
        }
    });
}

const show = (req, res) => {
    NoteModel.findById(req.params.noteId, (error, note) => {
        if(error)
            res.json({
                status: 'error',
                message: 'The note does note find',
                data: error
            });
        else
            res.json({
                status: 'OK',
                message: 'The requested note has found!',
                data: note
            });
    });
}

const update = (req, res) => {
    NoteModel.findById(req.params.noteId, (error, note) => {
        if (error)
            res.json({
                status: 'error',
                message: 'The note does note find',
                data: error
            });

        note.title = req.body.title ? req.body.title : note.title ;
        note.body = req.body.body ? req.body.body : note.body;

        note.save(error => {
            if(error)
                res.json({
                    status: 'error',
                    message: 'The update has been failed!',
                    data: error
                });

            res.json({
                status: 'OK',
                message: 'The note updated successfully!',
                data: note
            });
        });
    });
}

const destroy = (req, res) => {
    NoteModel.remove({
        _id: req.params.noteId
    }, (error) => {
        if(error)
            res.json({
                status: 'error',
                message: 'The note has note deleted!',
                data: error
            });

        res.json({
            status: 'OK',
            message: 'Note deleted'
        });
    });
}

module.exports = {
    index,
    show,
    create,
    update,
    destroy
}