package sid

import "testing"

func TestIntToBase62(t *testing.T) {
	sid := NewSid()
	s, err := sid.GenString()
	if err != nil {
		t.Error(err)
	}
	t.Log("sid: ", s)
	t.Log(len(s))
}
