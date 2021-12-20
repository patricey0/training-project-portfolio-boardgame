-- Verify portfolio:init on pg

BEGIN;

SELECT * FROM boardgame WHERE false;

ROLLBACK;
