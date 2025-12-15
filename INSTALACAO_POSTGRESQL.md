# 📚 Guia de Instalação PostgreSQL Local

## ✅ Pré-requisitos

Você precisa ter PostgreSQL instalado localmente na máquina.

## 🪟 Instalação no Windows

### Opção 1: Instalador Oficial (Recomendado)

1. Acesse: https://www.postgresql.org/download/windows/
2. Clique em "Download the installer"
3. Escolha a versão mais recente (16+)
4. **Durante a instalação, configure:**
   - **Superuser Password:** `postgres`
   - **Port:** `5432`
   - **Locale:** Portuguese (Brazil) ou seu idioma

5. Clique "Finish" para concluir

### Opção 2: Chocolatey (Se tiver instalado)

```powershell
choco install postgresql
```

Aceite as opções padrão (porta 5432, user postgres, password postgres).

### Opção 3: Windows Subsystem for Linux (WSL)

```bash
wsl
sudo apt update
sudo apt install postgresql postgresql-contrib
```

## 🔍 Verificar Instalação

Abra PowerShell e execute:

```powershell
psql --version
```

Se aparecer a versão, PostgreSQL está instalado ✅

## 🚀 Iniciar PostgreSQL

### No Windows (Automático)
PostgreSQL já inicia automaticamente como serviço.

### Verificar se está rodando

```powershell
# Testar conexão
psql -U postgres -h localhost -c "SELECT 1"
```

Se aparecer algo como:
```
 ?column?
----------
        1
(1 row)
```

PostgreSQL está rodando! ✅

## 🔧 Executar Setup

Depois de instalar PostgreSQL, execute na pasta do projeto:

```powershell
# Windows PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup-db.ps1
```

Ou:

```bash
# Git Bash / WSL
bash setup-db.sh
```

## ✨ O que o Setup faz

1. ✅ Verifica se PostgreSQL está instalado
2. ✅ Testa conexão com o banco
3. ✅ Cria banco de dados "hotfix"
4. ✅ Executa migrations (cria tabelas)
5. ✅ Insere usuário de teste

## 👤 Usuário de Teste

Após o setup, você terá acesso com:

```
📧 Email: demo@example.com
🔑 Senha: demo123456
```

## 🐛 Troubleshooting

### "psql: command not found"
- PostgreSQL não está instalado ou não está no PATH
- Reinstale PostgreSQL e confirme que a porta 5432 foi usada

### "FATAL: Ident authentication failed"
- Verifique se a senha é `postgres`
- Ou altere no `.env`

### "Port 5432 already in use"
- Outro programa está usando a porta
- Mude a porta no `.env` (ex: 5433)
- Ou encerre o programa que está usando

### Migrations falhando
- Verifique se o banco foi criado corretamente
- Execute: `psql -U postgres -h localhost -l` (lista bancos)

## 📖 Próximos Passos

Depois do setup:

```powershell
# Terminal 1 - API
cd api
npm run dev

# Terminal 2 - Frontend
cd web
npm run dev
```

Acesse: http://localhost:5173

---

**Dúvidas?** Verifique o SETUP.md no repositório.
