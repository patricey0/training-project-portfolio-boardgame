-- Deploy portfolio:functions to pg

BEGIN;

CREATE FUNCTION add_boardgame(json) RETURNS boardgame AS $$
	INSERT INTO boardgame (name, author, editor, min_players, max_players, min_age)
	VALUES (
		$1->>'name', 
		$1->>'author', 
		$1->>'editor', 
		($1->>'min_players')::int, 
		($1->>'max_players')::int, 
		($1->>'min_age')::int
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_boardgame(json) RETURNS boardgame AS $$
	UPDATE boardgame SET
		name=$1->>'name',
		author=$1->>'author',
		editor=$1->>'editor',
		min_players=($1->>'min_players')::int,
		max_players=($1->>'max_players')::int,
		min_age=($1->>'min_age')::int
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;
	

COMMIT;
