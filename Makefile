PYTHON ?= python3.11
PIP ?= $(PYTHON) -m pip

.PHONY: help install install-backend install-frontend test test-backend test-frontend build build-frontend migrate-up migrate-down lint

help:
	@echo "Available targets:"
	@echo "  install          Install backend and frontend dependencies"
	@echo "  test             Run backend and frontend tests"
	@echo "  build            Build frontend"
	@echo "  migrate-up       Run Alembic upgrade head"
	@echo "  migrate-down     Rollback one Alembic revision"

install: install-backend install-frontend

install-backend:
	cd backend && $(PIP) install -r requirements.txt

install-frontend:
	cd frontend && npm install

test: test-backend test-frontend

test-backend:
	cd backend && $(PYTHON) -m pytest -q

test-frontend:
	cd frontend && npm run test

build: build-frontend

build-frontend:
	cd frontend && npm run build

migrate-up:
	cd backend && $(PYTHON) -m alembic upgrade head

migrate-down:
	cd backend && $(PYTHON) -m alembic downgrade -1

lint:
	cd frontend && npm run lint
