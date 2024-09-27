package sid

import "testing"

func TestNewSid(t *testing.T) {
	s := NewSid()
	if s.sf == nil {
		t.Error("NewSid() failed")
	}
	id, err := s.sf.NextID()
	if err != nil {
		t.Error("NextID() failed")
	}
	t.Log(id)
}
