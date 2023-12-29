
    module.exports = function(app, siteData) {
        
    // Handle our routes
    app.get('/',function(req,res){
        res.render('index.ejs', siteData)
    });
    app.get('/about',function(req,res){
        res.render('about.ejs', siteData)
    });

    app.get('/AddUser/SignUp',function(req,res){
        res.render('add_user.ejs', siteData)
    });

    app.get('/Add_topic',function(req,res){
        res.render('add_topic.ejs', siteData)
    });

    app.get('/search_posts',function(req,res){
        res.render('search_posts.ejs', siteData)
    });
    
    app.get('/addNewPost',function(req,res){
        res.render('add_new_post.ejs', siteData)
    });

    //FOR USERS
    app.get('/existing_users', function(req, res) {
         let sqlquery = "SELECT * FROM User"; // getting the suers
         // the db query
         db.query(sqlquery, (err, result) => {
         if (err) {
         res.redirect('./'); 
         }
        let newData = Object.assign({}, siteData, {availableUsers:result});
         console.log(newData)
         res.render("existing_users.ejs", newData)
         });
         });
    

    app.post('/userAdded', function (req,res) {
        // adding to the database
        let sqlquery = "INSERT INTO user (Username) VALUES (?)";
        // the db query
        let newrecord = [req.body.username];
        db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
        return console.error(err.message);
        }
        else {
            // when the user is added the username is shown
        res.send(' This user has been added to database, Username: '
            + req.body.username);
        }
        });
        });

    
    //FOR TOPICS
    app.get('/existing_topics', function(req, res) {
        let sqlquery = "SELECT * FROM Topic"; // getting the topics
        // starting the sql query
        db.query(sqlquery, (err, result) => {
        if (err) {
        res.redirect('./'); 
        }
        let newData = Object.assign({}, siteData, {availableTopics:result});
        console.log(newData)
        res.render("existing_topics.ejs", newData)
        });
        });


    app.post('/TopicAdded', function (req,res) {
        // saving data in database
        let sqlquery = "INSERT INTO Topic (TopicName) VALUES (?)";

        let newrecord = [req.body.TopicName];
        db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
        return console.error(err.message);
        }
        else {
            // when the book is added the name and price is shown
        res.send(' This topic has been added to database, TopicName: '
            + req.body.TopicName);
        }
        });
        });

    //FOR POSTS///
    // This is for posting the new post,it takes from user and topic.
    app.post('/addNewPost', function (req, res) {
        let content = req.body.content;
        let username = req.body.Username;
        let topicname = req.body.TopicName;
    
        //User ID from username
        let fruitUser = "SELECT UserID FROM User WHERE Username = ?";
        db.query(fruitUser, [username], (errUser, resultUser) => {
        //topicID from topicname
        let fruitTopic = "SELECT TopicID FROM Topic WHERE TopicName = ?";
        db.query(fruitTopic, [topicname], (errTopic, resultTopic) => {
        // Insert the post into the Post table
        let fruitPost = "INSERT INTO Post (Content, UserID, TopicID) VALUES (?, ?, ?)";
        let postRecord = [content, resultUser[0].UserID, resultTopic[0].TopicID];

        db.query(fruitPost, postRecord, (errPost, resultPost) => {
            if (errPost) {
                return console.error(errPost.message);
            }
    
            // Post added to the website
            res.send('post added to Fruit Forum: ' + content);
    });
    });
    });
    });

    app.get('/existing_posts', function(req, res) {
        let sqlquery = `
          SELECT Post.Content, User.Username, Topic.TopicName
          FROM Post
          JOIN User ON Post.UserID = User.UserID
          JOIN Topic ON Post.TopicID = Topic.TopicID
        `;
      
        // the query gets the all the posts with the usernames and the topci names, 
        //that are tied to the UserIDand TopicID
        db.query(sqlquery, (err, result) => {
          if (err) {
            res.redirect('/');
          }
          let newData = Object.assign({}, siteData, { availablePosts: result });
          res.render("existing_posts.ejs", newData);
        });
      });
    
//FOR POSTS ABOVE///



    }
