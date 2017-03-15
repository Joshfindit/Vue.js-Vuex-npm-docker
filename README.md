# Testing

`docker-compose up` # Serves the app live on the port specified in `.env`

# Building
`docker-compose run vue-spa npm run build` # Compiles the app and saves it in `vue-spa.output`

# Testing the built files
* Copy the files from `vue-spa.output` to `nginx.docker/static_files_to_serve/`
* Run the docker image in `nginx.docker`
  *it will copy the files in. Live changing is not possible*
