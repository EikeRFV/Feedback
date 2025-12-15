#!/bin/bash
# Setup PostgreSQL local

echo "=========================================="
echo "SETUP PostgreSQL Local - Projeto Feedback"
echo "=========================================="
echo ""

# Verificar se PostgreSQL está instalado
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL não encontrado!"
    echo ""
    echo "Para Windows, baixe em: https://www.postgresql.org/download/windows/"
    echo "Ou use Chocolatey: choco install postgresql"
    echo ""
    echo "Durante a instalação:"
    echo "  - Port: 5432"
    echo "  - Username: postgres"
    echo "  - Password: postgres"
    exit 1
fi

echo "✅ PostgreSQL encontrado"
echo ""

# Verificar se psql consegue conectar
echo "Tentando conectar ao PostgreSQL..."
if psql -U postgres -h localhost -c "SELECT 1" &> /dev/null; then
    echo "✅ Conectado com sucesso!"
else
    echo "❌ Não consegue conectar. Verifique:"
    echo "  - PostgreSQL está rodando?"
    echo "  - Username/password estão corretos?"
    exit 1
fi

echo ""
echo "Criando banco de dados 'hotfix'..."
psql -U postgres -h localhost -c "DROP DATABASE IF EXISTS hotfix;" 2>/dev/null
psql -U postgres -h localhost -c "CREATE DATABASE hotfix;"

if [ $? -eq 0 ]; then
    echo "✅ Banco de dados criado!"
else
    echo "❌ Erro ao criar banco de dados"
    exit 1
fi

echo ""
echo "Executando migrations..."
cd api
npm run migrate:run

if [ $? -eq 0 ]; then
    echo "✅ Migrations executadas com sucesso!"
else
    echo "❌ Erro nas migrations"
    exit 1
fi

echo ""
echo "Inserindo dados de seed..."
npm run seed:run

echo ""
echo "=========================================="
echo "✅ SETUP CONCLUÍDO!"
echo "=========================================="
echo ""
echo "Próximos passos:"
echo "  1. Terminal 1: cd api && npm run dev"
echo "  2. Terminal 2: cd web && npm run dev"
echo ""
echo "Acessar em: http://localhost:5173"
