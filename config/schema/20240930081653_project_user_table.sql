-- migrate:up
CREATE TYPE permission_level AS ENUM ('admin', 'editor', 'reader');
CREATE TABLE project_users (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  project_id VARCHAR(64) NOT NULL,
  permission permission_level DEFAULT 'reader',
  is_deleted BOOLEAN DEFAULT FALSE,
  created_by VARCHAR(64) DEFAULT  NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_by VARCHAR(64) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
)

-- migrate:down
DROP TABLE project_users ;
DROP TYPE permission_level;
