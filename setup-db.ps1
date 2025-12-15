# Setup PostgreSQL local - Windows PowerShell

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "SETUP PostgreSQL Local - Projeto Feedback" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se PostgreSQL está instalado
$pgPath = Get-Command psql -ErrorAction SilentlyContinue

if (-not $pgPath) {
    Write-Host "❌ PostgreSQL não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Para Windows, opções de instalação:" -ForegroundColor Yellow
    Write-Host "  1. Baixar em: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    Write-Host "  2. Ou usar Chocolatey: choco install postgresql" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Durante a instalação, configure:" -ForegroundColor Yellow
    Write-Host "  - Port: 5432" -ForegroundColor Yellow
    Write-Host "  - Username: postgres" -ForegroundColor Yellow
    Write-Host "  - Password: postgres" -ForegroundColor Yellow
    Write-Host ""
    Exit 1
}

Write-Host "✅ PostgreSQL encontrado" -ForegroundColor Green
Write-Host ""

# Verificar conexão
Write-Host "Tentando conectar ao PostgreSQL..." -ForegroundColor Cyan
$connection = psql -U postgres -h localhost -c "SELECT 1" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Conectado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "❌ Não consegue conectar. Verifique:" -ForegroundColor Red
    Write-Host "  - PostgreSQL está rodando?" -ForegroundColor Yellow
    Write-Host "  - Username/password estão corretos?" -ForegroundColor Yellow
    Write-Host "  - Porta 5432 está disponível?" -ForegroundColor Yellow
    Exit 1
}

Write-Host ""
Write-Host "Preparando banco de dados..." -ForegroundColor Cyan

# Criar banco
psql -U postgres -h localhost -c "DROP DATABASE IF EXISTS hotfix;" 2>$null
$createDb = psql -U postgres -h localhost -c "CREATE DATABASE hotfix;" 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Banco de dados 'hotfix' criado!" -ForegroundColor Green
} else {
    Write-Host "❌ Erro ao criar banco de dados" -ForegroundColor Red
    Write-Host $createDb -ForegroundColor Red
    Exit 1
}

Write-Host ""
Write-Host "Executando migrations..." -ForegroundColor Cyan
Set-Location api
npm run migrate:run

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro nas migrations" -ForegroundColor Red
    Exit 1
}

Write-Host "✅ Migrations executadas com sucesso!" -ForegroundColor Green

Write-Host ""
Write-Host "Inserindo dados de seed (usuário de teste)..." -ForegroundColor Cyan
npm run seed:run

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Seeds inseridos!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Erro ao inserir seeds (não crítico)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ SETUP CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "  1. Terminal 1: cd api && npm run dev" -ForegroundColor Cyan
Write-Host "  2. Terminal 2: cd web && npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Credenciais de teste:" -ForegroundColor Yellow
Write-Host "  📧 Email: demo@example.com" -ForegroundColor Cyan
Write-Host "  🔑 Senha: demo123456" -ForegroundColor Cyan
Write-Host ""
Write-Host "Acessar em: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
