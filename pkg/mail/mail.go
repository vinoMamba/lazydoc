package mail

import (
	"github.com/spf13/viper"
	"gopkg.in/gomail.v2"
)

type Mail struct {
	Dialer gomail.Dialer
}

func NewMail(conf *viper.Viper) *Mail {
	dialer := gomail.NewDialer(
		conf.GetString("mail.host"),
		conf.GetInt("mail.port"),
		conf.GetString("mail.user"),
		conf.GetString("mail.passwd"),
	)
	return &Mail{
		Dialer: *dialer,
	}
}

func (m *Mail) SendRegisterLink(to string, link string) error {
	msg := gomail.NewMessage()
	msg.SetHeader("From", "1@qq.com")
	msg.SetHeader("To", to)
	msg.SetHeader("Subject", "AiDoc 注册链接")
	msg.SetBody("text/html", "点击下方链接进行验证：<br/>"+link+"<br/>五分钟内有效")

	if err := m.Dialer.DialAndSend(msg); err != nil {
		return err
	}
	return nil
}
