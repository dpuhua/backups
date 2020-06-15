module.exports = {
  apps: [
    {
      name: 'hdb-estate-websit',
      exec: 'server/index.js',
      args: 'one two',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '2G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      out_file: './out.log',
      error_file: './error.log',
      env: {
        COMMON_VARIABLE: 'true'
      },
      // 开发环境
      env_dev: {
        NODE_ENV: 'dev'
      },
      // 测试环境
      env_test: {
        NODE_ENV: 'test'
      },
      // 生产环境
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}

// 'npm install && npm run build && pm2 start --env production'
