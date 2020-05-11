# CRYPTOFOKER

A simple site to check your coins on forked project

# DEVELOP

To run site locally you can use:

## Docker

```
docker run --rm --name cryptosever -p 80:80 -v $(pwd):/usr/share/nginx/html:ro -v $(pwd)/assets/docker/default.conf:/etc/nginx/conf.d/default.conf:ro -d nginx
```

## NodeJS

(TODO)
