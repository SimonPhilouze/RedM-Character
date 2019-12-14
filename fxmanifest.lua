client_script {
  'src/index.js',
  'src/utils/*.js',
}

game 'common' -- this resource only runs on the server, so it can use 'common'
fx_version 'adamant'