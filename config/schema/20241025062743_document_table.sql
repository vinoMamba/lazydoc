-- migrate:up
CREATE TABLE documents (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  parent_id VARCHAR(64) DEFAULT NULL,
  project_id VARCHAR(64) DEFAULT NULL,
  pre_doc_id VARCHAR(64) DEFAULT NULL,
  name VARCHAR(200) NOT NULL,
  is_folder BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_by VARCHAR(64) DEFAULT  NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_by VARCHAR(64) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
)


-- migrate:down
DROP TABLE documents;
