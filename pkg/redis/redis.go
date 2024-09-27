package redis

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v3/log"
	"github.com/redis/go-redis/v9"
	"github.com/spf13/viper"
)

type RedisInternal struct {
	Redis *redis.Client
}

func NewRedisConn(config *viper.Viper) *RedisInternal {
	r := redis.NewClient(&redis.Options{
		Addr:     config.GetString("redis.addr"),
		Password: config.GetString("redis.password"),
		DB:       config.GetInt("redis.db"),
	})

	log.Info("Redis connected")
	return &RedisInternal{
		Redis: r,
	}
}

func (r *RedisInternal) SetValue(ctx context.Context, key string, value any, exp time.Duration) error {
	return r.Redis.Set(ctx, key, value, exp).Err()
}

func (r *RedisInternal) GetValue(ctx context.Context, key string) (string, error) {
	return r.Redis.Get(ctx, key).Result()
}

func (r *RedisInternal) Exists(ctx context.Context, key string) (int64, error) {
	return r.Redis.Exists(ctx, key).Result()
}

func (r *RedisInternal) DelValue(ctx context.Context, key string) error {
	return r.Redis.Del(ctx, key).Err()
}

func (r *RedisInternal) TTL(ctx context.Context, key string) (time.Duration, error) {
	return r.Redis.TTL(ctx, key).Result()
}
