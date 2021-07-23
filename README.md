# API &STOCK
Back-end desenvolvido para o desafio keener. API feita para funcionar localmente rodando em conjunto com o docker

Para rodar a api em conjunto com o docker, utilizar o seguinte comando:

```
docker run -p 127.0.0.1:3306:3306  --name mysql-mariadb -e MARIADB_ROOT_PASSWORD=root -d mariadb
```
Após isso, exportar o banco de dados que está dentro da basta 'bd' no projeto para o Mysql workbench , e criar uma conexão local com usuários e senhas 'root'. na na mesma porta
utilizada para rodar o comando do docker (3306);

Atente-se para trocar as informações dentro do arquivo 'nodemon.json', principalmente o nome do banco 'MYSQL_DATABASE', para o mesmo nome que você der no workbench
