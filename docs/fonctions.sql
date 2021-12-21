CREATE FUNCTION new_boardgame(
	name TEXT, 
	author TEXT, 
	editor TEXT, 
	min_players INT, 
	max_players INT, 
	min_age INT
) RETURNS INT AS $$
	INSERT INTO boardgame(name, author, editor, min_players, max_players, min_age)
	VALUES(name, author, editor, min_players, max_players, min_age)
	RETURNING id;
$$ LANGUAGE SQL STRICT

CREATE FUNCTION new_boardgame(
	TEXT, TEXT, TEXT, INT, INT, INT
) RETURNS INT AS $$
	INSERT INTO boardgame(name, author, editor, min_players, max_players, min_age)
	VALUES($1, $2, $3, $4, $5, $6)
	RETURNING id;
$$ LANGUAGE SQL STRICT