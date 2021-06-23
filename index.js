var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoutes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const BlogSchema = require('./src/models/crmModels');
const blogModel = mongoose.model('blog', BlogSchema);

mongoose.connect('mongodb://localhost/test', {
    userNewUrlParser: true
});

// server static files
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/newBlog', (req, res) => {
    let blog = new blogModel(req.body);
    blog.save((err, blogModel) => {
        if(err)
            res.send(err);
        res.json(blog);
    })
});

let getAllBlogs = (req, res) => {
    blogModel.find({}, (err, blogs) => {
        if(err)
            res.send(err);
        res.json(blogs);
    }) 
}

let getBlogByID = (req, res) => {
    blogModel.findById((req.params.blogId), (err, blog) => {
        if(err)
            res.send(err);
        res.json(blog);
    })
}

let updateBlog=(req, res) => {
    blogModel.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true}, (err, updateBlog) => {
        if(err)
            res.send(err);
        res.json(updateBlog);
    })
}

let deleteBlog = (req, res) => {
    blogModel.remove({_id: req.params.blogId}, (err, blog) => {
        if(err)
            res.send(err);
        res.json({message: 'this blog is deleted'});
    });
}

app.get('/getBlogs', getAllBlogs);
app.get('/blog/:blogId', getBlogByID);
app.put('/blog/:blogId', updateBlog);
app.delete('/blog/:blogId', deleteBlog);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
