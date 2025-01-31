package middleware

import "net/http"

type Middleware struct{}

func (m *Middleware) JsonMiddleware(next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-type","application/json")
		next.ServeHTTP(w,r)
	})
}

var GlobalMiddleware = &Middleware{}