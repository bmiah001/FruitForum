-- CReate the Database
CREATE DATABASE IF NOT EXISTS new_fruit_forum;

-- Create the User table
CREATE TABLE User (
    UserID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL
);

-- Create the Topic table
CREATE TABLE Topic (
    TopicID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TopicName VARCHAR(255) NOT NULL
);

-- Create the Post table
CREATE TABLE Post (
    PostID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Content TEXT NOT NULL,
    UserID INT,
    TopicID INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (TopicID) REFERENCES Topic(TopicID)
);

-- Grant all priveleges to appuser
GRANT ALL PRIVILEGES ON new_fruit_forum.* TO 'appuser'@'localhost';
FLUSH PRIVILEGES;
