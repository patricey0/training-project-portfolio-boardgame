-- Revert portfolio:functions from pg

BEGIN;

DROP FUNCTION update_boardgame(json);
DROP FUNCTION add_boardgame(json);

COMMIT;
