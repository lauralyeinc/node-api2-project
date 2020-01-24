const express = require('express');
const db = require('../data/db.js'); 
const router = express.Router();



/*| POST   | /api/posts
            | Creates a post using the information sent inside the `request body`. */
router.post('/', (req, res) => {      //works! 
    const Post = req.body;
    db.insert(Post)
    .then(post => {
        if(post) {
            res.status(201).json(post);
        } else {
            res.status(400).json({
                message:'Please provide title and contents for the post'});
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({
            message: 'There was an error while saving the post to the database.'});
        });
});

/*| POST   
| /api/posts/:id/comments | Creates a comment for the post with the specified id using information sent inside of the `request body`. 
*/
router.post('/:id/comments', (req, res) => {
    const commentInfo = req.body;
    commentInfo.post_id = req.params.id;
    
    db.insertComment(commentInfo)   
    .then(comments => {
        if(comments) {
            res.status(201).json(comments)
        } else if(id) {
            res.status(404).json({
            message: 'The post with the specified ID does not exist'}); 
        } else {
            res.status(400).json({message: 'Please provide text for the comment'});
        };
    })
    .catch(error => {
        res.status(500).json({message:
        "error, fail"});
    }); 
});

/* | GET    
| /api/posts              | Returns an array of all the post objects contained in the database.   
*/

router.get('/', (req, res) => {      
    db.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: 'Error retrievening the posts'
        });
    });
});

/* | GET    
| /api/posts/:id          | Returns the post object with the specified id.  
*/

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then(posts => {
        if(posts.length > 0) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'The post information could not be retrieved'
        });
    });
}); 



/*                           |
| GET    |
/api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id.  
*/
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
        .then(comments => {
            if(comments.length > 0) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                });
            }
        })
        .catch(error => {
            res.status(500).json({message: 'The post infomration could not be retrieved'});
        });
});

/*
| DELETE | /api/posts/:id          
| Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |
*/

router.delete('/:id', (req, res) => {     // works! 
    // const {id} = req.params;    //doesn't work with req.params.id   this works with ID const id = req.params.id; 

    db.remove(id)
    .then(posts => {
        if(posts > 0) {
            res.status(200).json({message: 'The post has been removed'});
        } else { 
            res.status(404).json({message: 'The post with the specified ID does not exist.'});
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'The post could not be removed.'
        });
    });
});

/*
| PUT    | /api/posts/:id          
| Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.    
*/

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const post = req.body;

    db.update(id, post)
    .then(posts => {
        if(posts) {
            res.status(200).json(posts)
        } else if(id) {
            res.status(404).json({
            message: 'The post with the specified ID does not exist.'});
        } else {
            res.status(400).json({
                message: 'Please provide title and contents for the post.'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'The post information could not be modified'
        });
    });
});


module.exports = router;   //has to be exported! //error #1 (should be at the very end of your work.)