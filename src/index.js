const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;
require("./db/conn");
const Post = require("./models/datas");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.render("index");
});

app.get("/posts", (req, res) => {
    res.render("post");
});

app.get("/get", (req, res) => {
    res.redirect("/get/all")
});

app.get("/delete", (req, res) => {
    res.redirect("/delete/all")
});

app.get("/get/all", (req, res) => {
    var mysort = { _id: -1 };
    Post.find({}, (err, posts) => {
        if (err) console.warn(err);
        else {
            data = posts
            if (posts.length === 0) {
                res.render("nodatafound")
            } else {
             res.render("get", {"data":data});   
            }
        }
    }).sort(mysort)
});

app.get("/get/:postId", (req, res) => {
    Post.find({_id: req.params.postId }, (error, posts) => {
        if (error) {
            console.warn(error);
        }
        else {
            data = posts;
            res.render("get", { "data": data });
        }
    });
});

// delete a specific post
app.get('/delete/:postId', (req, res) => {
    Post.deleteOne({ _id: req.params.postId }, (error, posts) => {
        if (error) {
            console.warn(error);
        }
        else {
            data = posts
            res.render("delete", {"data": data})
        }
    });
});

// Update a post

app.get('/update/:postId', (req, res) => {
    Post.find({_id: req.params.postId }, (error, posts) => {
        if (error) {
            console.warn(error);
        }
        else {
            data = posts;
            res.render("update", { "data": data });
        }
    });
});

// Commit the update

app.post('/commit/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({
            _id: req.params.postId
        }, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        });
        res.render("updateSuccess", {"data": updatedPost });
    } catch (error) {
        console.log(error);
    }
});

// delete all records
app.get('/delete/all', (req, res) => {
    Post.deleteMany({});
    res.render("delete");
});


// Make a POST request

app.post("/posts", async (req, res) => {
    try {
        const registerPost = new Post({
            title: req.body.title,
            description: req.body.description
        });  
        const register = await registerPost.save();
        res.status(201).render("success", {"data": register});
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

app.listen(port, () => {
    console.log("listening on port "+port)
});