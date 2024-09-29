-- migrate:up
ALTER TABLE users ADD COLUMN created_by VARCHAR(64) DEFAULT NULL;

-- migrate:down
ALTER TABLE users DROP COLUMN created_by ;
