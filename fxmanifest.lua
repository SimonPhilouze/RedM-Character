client_script {
  'src/client/cmds/*.js',
  'src/client/scenes/*.js',
  'src/client/index.js',
  'src/client/utils/*.js',
  'src/client/events/*.js'
}

server_script {
  "src/server/index.js",
  "src/server/events/*.js"
}

game 'common' -- this resource only runs on the server, so it can use 'common'
fx_version 'adamant'