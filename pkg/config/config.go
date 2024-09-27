package config

import (
	"github.com/spf13/viper"
)

func NewConfig(conf string) *viper.Viper {
	v := viper.New()
	v.SetConfigFile(conf)
	if err := v.ReadInConfig(); err != nil {
		panic(err)
	}
	return v
}
