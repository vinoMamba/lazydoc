package main

import (
	"flag"
	"fmt"
	"io"
	"os"

	"github.com/gofiber/fiber/v3/log"
	"github.com/vinoMamba/lazydoc/cmd/wire"
	"github.com/vinoMamba/lazydoc/pkg/config"
)

func main() {
	envConf := flag.String("config", "./config/local.yaml", "config file path")
	flag.Parse()
	config := config.NewConfig(*envConf)

	file, _ := os.OpenFile(config.GetString("log.log_file_name"), os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	iw := io.MultiWriter(os.Stdout, file)
	log.SetOutput(iw)
	app, cleanup, err := wire.NewApp(config)
	if err != nil {
		panic(err)
	}

	defer cleanup()
	app.Listen(fmt.Sprintf(":%d", config.GetInt("http.port")))

}
