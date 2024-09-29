-- migrate:up
ALTER TABLE users ADD COLUMN updated_by VARCHAR(64) DEFAULT NULL;
ALTER TABLE users ADD COLUMN deleted_by VARCHAR(64) DEFAULT NULL;

-- migrate:down
ALTER TABLE users DROP COLUMN updated_by ;
ALTER TABLE users DROP COLUMN deleted_by ;

