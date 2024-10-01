-- migrate:up
CREATE TABLE projects (
  id VARCHAR(64) NOT NULL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_by VARCHAR(64) DEFAULT  NULL,
  created_at TIMESTAMP DEFAULT NULL,
  updated_by VARCHAR(64) DEFAULT NULL,
  updated_at TIMESTAMP DEFAULT NULL
)


-- migrate:down
DROP TABLE projects;
