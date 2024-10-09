-- migrate:up
ALTER TABLE documents ADD COLUMN is_pin BOOLEAN DEFAULT FALSE;

-- migrate:down
ALTER TABLE documents DROP COLUMN is_pin ;
