package jwt

import (
	"errors"
	"regexp"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/spf13/viper"
)

type JWT struct {
	key []byte
	exp int
}

type CustomClaims struct {
	Email         string
	ActiveSpaceId string
	UserId        string
	jwt.RegisteredClaims
}

func NewJWT(config *viper.Viper) *JWT {
	return &JWT{
		key: []byte(config.GetString("jwt.key")),
		exp: config.GetInt("jwt.exp"),
	}
}

func (j *JWT) GenJWT(userId, email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, CustomClaims{
		Email:  email,
		UserId: userId,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * time.Duration(j.exp))),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "",
			Subject:   "",
			ID:        "",
			Audience:  []string{},
		},
	})
	t, err := token.SignedString(j.key)
	if err != nil {
		return "", err
	}
	return t, nil
}

func (j *JWT) ParseToken(tokenString string) (*CustomClaims, error) {
	re := regexp.MustCompile(`(?i)Bearer `)
	tokenString = re.ReplaceAllString(tokenString, "")
	if tokenString == "" {
		return nil, errors.New("token is empty")
	}

	token, err := jwt.ParseWithClaims(
		tokenString,
		&CustomClaims{},
		func(token *jwt.Token) (interface{}, error) {
			return j.key, nil
		})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, err
	}
}
