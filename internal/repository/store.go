package repository

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v3/log"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/spf13/viper"
)

func NewConn(conf *viper.Viper) DBTX {
	ctx := context.Background()
	config, err := pgxpool.ParseConfig(conf.GetString("pg.dsn"))
	if err != nil {
		panic(err)
	}

	config.MaxConnLifetime = time.Hour
	config.MaxConns = 15

	conn, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		panic(err)
	}
	log.Info("Database connected")

	return conn
}

func (q *Queries) NewDB() *pgxpool.Pool {
	return q.db.(*pgxpool.Pool)
}
