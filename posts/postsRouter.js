const express = require('express');
const Posts = require('../data/db.js'); 
const router = express.Router();



/*| POST   | /api/posts
            | Creates a post using the information sent inside the `request body`. */
router.post('/', (req, res) => {
    const Post = req.body;
    // Posts.add(req.body);
    Posts.insert(Post)
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
router.post("/:id/comments", (req, res) => {
    const CommentInfo = req.body;
    // CommentInfo.posts_id = req.params.id;
    const {id} = req.params;

    Posts.addCommnet(CommentInfo)
    .then(comment => {
        if(comment) {
            res.status(201).json(comment)
        } else if(id) {
            res.status(404).json({
            message: 'The post with the specified ID does not exist'}); 
        } else {
            res.status(400).json({message: 'Please provide text for the comment'});
        }
    })
    .catch(error => {
        res.status(500).json({message:
        "error, fail"});
    }); 
});

/* | GET    
| /api/posts              | Returns an array of all the post objects contained in the database.   
*/

router.get('/', (req, res) => {      //works! 
    Posts.find(req.query)
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
router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if(post.length > 0) {
            res.status(200).json(post)
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
    Posts.findPostComments(req.params.id)
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




module.exports = router;   //has to be exported! //error #1 (should be at the very end of your work.)