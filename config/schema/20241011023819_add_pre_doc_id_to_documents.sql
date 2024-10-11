-- migrate:up
ALTER TABLE documents ADD COLUMN pre_doc_id VARCHAR(64) DEFAULT NULL;
-- migrate:down
ALTER TABLE documents DROP COLUMN pre_doc_id ;
