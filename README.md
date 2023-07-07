# Proyecto *backend* para el curso de [aplicaciones móviles para *IoT*](https://dignal.com/curso-apps-moviles)

<div style="text-align: center;">
<img src="https://dignal.com/wp-content/uploads/2015/03/dignal_logo_microcontroladores.png" width="300px" />
</div>

## Requisitos previos a considerar
- [Docker](https://docs.docker.com/get-docker).
- Cuenta de [Google Cloud Platform](https://cloud.google.com).
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).
- [Terraform](https://www.terraform.io/downloads).
___

## 1 - Comandos para desarrollo
1. Crear el archivo `.env` con base en el archivo `.env.example`.
2. Definir las variables de entorno para la configuración del proyecto en el archivo `.env`.
3. Ejecutar el comando para la construcción de los contenedores.
```bash
docker compose -f .docker/docker-compose.yml up -d
```
4. Ejecutar el comando para instalar las librerías requeridas para el funcionamiento del proyecto.
```bash
docker compose -f .docker/docker-compose.yml run --rm node npm install
```
5. Ejecutar el comando para la creación de las tablas del proyecto.
```bash
docker compose -f .docker/docker-compose.yml run --rm node npx sequelize-cli db:migrate
```
6. Ejecutar el comando para la creación del usuario demo.
```bash
docker compose -f .docker/docker-compose.yml run --rm node npx sequelize-cli db:seed:all
```
7. Levantar el contenedor para iniciar el desarrollo.
```bash
docker compose -f .docker/docker-compose.yml run --rm --service-ports node npm start
```
___
## 2 - Proceso previo a despliegue a producción
1. Crear un nuevo proyecto en [Google Cloud Console](https://console.cloud.google.com).
2. Inicializar la línea de comandos de [Google Cloud Platform](https://cloud.google.com).
```bash
gcloud init
```
3. Vincular [Terraform](https://www.terraform.io) con [Google Cloud SDK](https://cloud.google.com/sdk).
```bash
gcloud auth application-default login
```
4. Generar una llave para conexión remota por *SSH*.
```bash
ssh-keygen -t ed25519 -C <username>
```
5. Activar el servicio de `Compute Engine API`
```bash
gcloud services enable compute.googleapis.com
```
___
## 3 - Comandos para el despliegue a producción.
1. Ingresar a la carpeta donde se encuentra almacenado la configuración de [Terraform](https://www.terraform.io).
```bash
cd .terraform/
```
2. Inicializar la configuración y descargar los módulos necesarios de [Terraform](https://www.terraform.io).
```bash
terraform init
```
3. Configurar las variables a utilizar previo a ejecutar el despliegue en el archivo `terraform.tfvars`.
4. Ejecutar el comando para corroborar el plan de despliegue de la configuración hacia [Google Cloud Platform](https://cloud.google.com).
```bash
terraform plan
```
5. Ejecutar el comando para iniciar el despliegue hacia [Google Cloud Platform](https://cloud.google.com).
```bash
terraform apply --auto-approve
```
6. Conectarse al servidor por medio de la terminal.
```bash
ssh <username>@<ip_address> -i ~/.ssh/<username>
```
7. Configurar MySQL para poder conectarse a la base de datos.
```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES
```
8. Copiar el archivo `.docker/.env` a la raíz del proyecto y configurar 
   las credenciales de base de datos, puertos de servicios, credenciales de MQTT
   y las claves secretas para JWT.
9. Configurar el archivo `.vscode/sftp.json` para conectarse de manera remota al servidor.
10. Ejecutar los comandos para la instalación de librerías y ejecución de las migraciones y creación de usuario en la base de datos.
```bash
npm ci
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
11.  Configurar la librería PM2 para la ejecución automática del proyecto dentro de la carpeta del mismo.
```bash
pm2 start src/index.js
pm2 startup
```
12.  Cargar los archivos al servidor.
