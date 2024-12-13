CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE todos (
	id serial NOT NULL PRIMARY KEY,
	title varchar(50) NOT NULL,
	description varchar(250),
  user_id int NOT NULL REFERENCES users
);