#!/bin/sh
set -e

# 如果挂载的 /app/data 目录为空，则从 /app/data-init 中复制默认数据
if [ -z "$(ls -A /app/data 2>/dev/null)" ]; then
  echo "Data directory is empty. Initializing with default data..."
  cp -R /app/data-init/* /app/data/
fi

# 执行传入的命令
exec "$@"