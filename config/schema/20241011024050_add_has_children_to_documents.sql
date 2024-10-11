-- migrate:up
ALTER TABLE documents ADD COLUMN has_children BOOLEAN DEFAULT FALSE;
-- migrate:down
ALTER TABLE documents DROP COLUMN has_children ;
