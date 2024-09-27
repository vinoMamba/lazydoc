package digit

import "crypto/rand"

func GernerateDigits(len int) string {
	b := make([]byte, len)
	_, err := rand.Read(b)
	if err != nil {
		return ""
	}
	digits := make([]byte, len)
	for i := range b {
		// 48 is the ascii code for 0
		digits[i] = b[i]%10 + 48
	}
	return string(digits)
}
