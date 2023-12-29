-- data for user table
INSERT INTO User (Username) VALUES
    ('ann'),
    ('tip');

-- data for topic table
INSERT INTO Topic (TopicName) VALUES
    ('red'),
    ('cherry');

-- Dat for Post table
INSERT INTO Post (Content, UserID, TopicID) VALUES
    ('I like cabbage', 12, 8), -- User 'ann' and Topic 'red'
    ('in the summer cherry is good', 12, 9); -- User 'ann' and Topic 'cherry'