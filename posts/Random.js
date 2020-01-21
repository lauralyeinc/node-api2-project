router.get('/:id/messages', (req, res) => {
    Hubs.findHubMessages(req.params.id)
        .then(messages => {
            if (messages.length > 0) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({message: 'no messages for that hub'});
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error', err});
        }); 
}); 