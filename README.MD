# Backend Challeng Nave

API feita para backend challenge da [Nave.rs](https://nave.rs) utilizando Node.js e Mysql.


# Tecnologias e ferramentas utilizadas no desenvolvimento

* Visual Studio Code - https://code.visualstudio.com
* Insomnia - https://insomnia.rest
* Mysql - https://www.mysql.com
* Xampp - https://www.apachefriends.org/pt_br/index.html
* Yarn - https://yarnpkg.com/en/
* Prettier - https://github.com/prettier/prettier-vscode
* Eslint - https://eslint.org
* EditorConfig - https://editorconfig.org

### Versão LTS do Node.js

* v12.14.0 LTS

## Dependências

* express: 4.17.1
* mysql2: 2.0.2
* sequelize: 5.21.3
* yup: 0.28.0

### Dependências de desenvolvimento

* eslint: 6.7.2
* eslint-config-airbnb-base: 14.0.0
* eslint-config-prettier: 6.7.0
* eslint-plugin-import: 2.19.1
* eslint-plugin-prettier: 3.1.2
* nodemon: 2.0.2
* prettier: 1.19.1
* sequelize-cli: 5.5.1
* sucrase: 3.10.1"

### Para baixar dependências

```shell
  > yarn
```

# Banco de dados

1. Crie um banco de dados chamado navedb no Mysql
2. Rode o script 'navedbscript.sql'no banco de dados 'navedb' criado (script no diretório /db)
3. Talvez seja necessário alterar o usuário e senha do arquivo de configuração em src/config/database.js

Relacional utilizado (sem normalizações) encontra-se no diretório /diagrama

# Executando

Script com nodemon no diretório nave-api (com sucrase)
```shell
  > yarn dev
```


# Rotas e o que cada uma recebe

```javascript
/**
 * Admin routes
 */
routes.get('/admin', adminController.index);
routes.get('/admin/:email', adminController.findByEmail); // params: { email }
routes.post('/admin', adminController.store); // body: { name, email }
routes.put('/admin/:id', adminController.updateEmail); // params: { id }, body: { email }
routes.delete('/admin/:id', adminController.deleteById); // params: { id }

/**
 * Candidate routes
 */
routes.get('/candidate', candidateController.index);
routes.get('/candidate/:cpf', candidateController.findByCpf); // params: { cpf }
routes.post('/candidate', candidateController.store); // body: { name, email, cpf, phone }
routes.put('/candidate/:id', candidateController.update); // params: { id }, body: { email, phone }
routes.delete('/candidate/:cpf', candidateController.deleteByCpf); // params: { id }

/**
 * Vacancy routes
 */
routes.get('/vacancy', vacancyController.index);
routes.get('/vacancy/:id', vacancyController.findById); // params: { id }
routes.post('/vacancy/:id', vacancyController.store); // params: { id (admin id) } , body: { name }
routes.put('/vacancy/:id', vacancyController.update); // params: { id (vacancy id) }, body: { id (admin id), name }
routes.delete('/vacancy/:id', vacancyController.deleteById); // params: { id (vacandy id) }, body: {id (admin id), name }

/**
 * Candidacy routes
 */
routes.get('/candidacy', candidacyController.index);
routes.get('/candidacy/:id', candidacyController.findById); // params: { id }
routes.get('/candidacy/filter/:id', candidacyController.filterByVacancy); // params: { id (vacancy id) }
routes.post('/candidacy', candidacyController.store); // body: { idVacancy, idCandidate }
routes.put('/candidacy/:id', candidacyController.updateComment); // params: { id (candidacy id) }, body: { comment, idAdmin }
routes.delete('/candidacy/:id', candidacyController.deleteById); // params: { id }
```

### Informações adicionais

* Padrão de pastas utilizado: MVC
* Arquivo das variáveis de ambiente .env preferencialmente deve ser ignorado em .gitignore

## Autor

Christopher Moura  
https://github.com/ccmoura
