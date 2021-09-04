module.exports = {
  apps: [
    {
      name: 'microchat backend',
      script: 'dist/Shared/Infra/Http/index.js',
      exec_mode: 'fork',
      max_memory_restart: '200M'
    }
  ]
}
