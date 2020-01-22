router.post('/:id/messages', (req, res) => {
    const messageInfo = req.body;
    messageInfo.hub_id = req.params.id;
    // console.log(messageInfo);  
    Hubs.addMessage(messageInfo)
        .then(message => {
            res.status(201).json(message);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating the hub'
            });
        });
});

router.get('/:id', (req, res) => {
    Hubs.findById(req.params.id)
    .then(hub => {
    if (hub) {
        res.status(200).json(hub);
    } else {
        res.status(404).json({ message: 'Hub not found' });
    }
    })
    .catch(error => {
    // log error to database
    console.log(error);
    res.status(500).json({
        message: 'Error retrieving the hub',
    });
    });
});

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const change = req.body;

    db.update(id, change)
        .then(user => {
            if(user) {
                res.status(200).json({success: true, user});
            } else if(id) {
                res.status(404).json({succes: false, 
                    message: 'The user with the specified ID does not exist.'}); 
            } else {
                res.status(400).json({sucess: false, message: 'Please provide name and bio for the user.'});
            }
        })
        .catch(err => {
            res.status(500).json({success: false, 
                message: 'The user information could not be modified.'})
        });
});