# meme-templates
汎用ボイラープレート

## Require
+ Node.js
+ Webpack
+ Sass
+ Babel [ES6]
+ Docker

## Documentation

### Initial setting

共通設定

1. package.jsonのconfigに記載されているディレクトリパスをプロジェクトに合わせて書き換える
2. bs-config.jsのディレクトリパスをプロジェクトに合わせて書き換える

Wordpressの場合

3. package.jsonの wordpress > enable を"true"に変更する

その後コマンドを実行する
```
npm i
```

### npm Commands
#### start
```
npm start
```
#### end
Ctrl + c

### Docker Commands

#### start
```
docker-compose up
```
#### end
```
docker-compose down
```
#### RESTORE
```
docker-compose exec mysql bash -i -c 'cd /home & mysql -u mysql_user -pmysql_pw meme < meme.sql'
```  
#### export
```
docker-compose exec mysql bash -i -c 'cd /home & mysqldump -u mysql_user -pmysql_pw meme > meme.sql'
```
