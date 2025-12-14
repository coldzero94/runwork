package service

import (
	"errors"
	"strings"

	"github.com/coby/runwork/apps/backend/internal/config"
	"github.com/coby/runwork/apps/backend/internal/models"
	"github.com/coby/runwork/apps/backend/internal/repository"
	"github.com/golang-jwt/jwt/v5"
)

type AuthService struct {
	userRepo *repository.UserRepository
}

func NewAuthService(userRepo *repository.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

type SupabaseClaims struct {
	jwt.RegisteredClaims
	Email string `json:"email"`
	Sub   string `json:"sub"`
}

func (s *AuthService) ValidateToken(tokenString string) (*models.User, error) {
	// Remove "Bearer " prefix if present
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	token, err := jwt.ParseWithClaims(tokenString, &SupabaseClaims{}, func(token *jwt.Token) (interface{}, error) {
		// Validate signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(config.AppConfig.SupabaseJWTSecret), nil
	})

	if err != nil {
		return nil, errors.New("invalid token")
	}

	claims, ok := token.Claims.(*SupabaseClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token claims")
	}

	// Find or create user
	user, err := s.userRepo.FindOrCreate(claims.Sub, claims.Email)
	if err != nil {
		return nil, err
	}

	return user, nil
}
