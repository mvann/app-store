# AUTONET - application delivery system for developer-car interactions
## General requirements:
* Docker ([Install Docker](https://docs.docker.com/docker-for-mac/install/))
* Python3, deb_pkg_tools ([Install deb_pkg_tools](https://deb-pkg-tools.readthedocs.io/en/latest/#installation)) to run *create_package* tool, or use example .deb packages)
* nodejs ([get node](https://nodejs.org/en/download/))
* yarn ([get yarn](https://yarnpkg.com/en/docs/install))

## Installation:
### Package creation:
1. Go to *dev_tools/*
2. Create a folder with application (store sources using /usr/bin/ way) or use example applications: *hello-sh*, *another-sh*
3. Set-up environment variables:
```
export DPT_ALLOW_FAKEROOT_OR_SUDO=false
export DPT_CHOWN_FILES=false
export DPT_RESET_SETGID=false
export DPT_SUDO=false
```
4. Create a new package: `python create_package.py <path> <pkg_name> <version> [icon_path]`
5. Check that new **.deb** package was created

### Security keys:
1. Create public and private keys using your favourite encryption program (we used pgp) or use example keys
2. Store them in *repo_manager/secret* as **pubring.gpg** and **secring.gpg**

### Repository:
1. Go to repo_manager/
2. Build docker container: `docker build -t ford:repo .`
2. Run docker container: `./run.sh`
3. Check that the repository is running on *localhost:8000*
4. Package direct upload UI running on *localhost:5000*

### Car client:
1. Go to *car_client/*
2. Build docker container: `docker build -t ford:car .`
3. Make a copy of **pubring.pgp** and store it in current folder (*car_client/*)
4. Run docker container: `./run_flask.sh`
5. (Run container in interactive mode using: `./run.sh`)
6. Use `./stop.sh` to stop container

## Webpage Backend:
1. Go to *webpage_backend/*
2. Install dependencies: `yarn install`
3. Start the api server: `node index.js`
4. Check that the server is running on `localhost:5001`

## Webpage
1. Go to *webpage/*
2. Install dependencies: `yarn install`
3. Run `yarn start` to start development server
4. Check that the development server is running on `localhost:3000`

## MongoDB
* This project's database was built on a MongoDB Atlas service
* Connection configuration can be found in *webpage_backend/api/db.js*
* This database server will be shutdown soon

## Usage:
### Upload packages to repository:
1. Go to *localhost:5000*
2. Use UI to upload file (only *.deb* files are acceptable)
3. Check repository content on *localhost:8000*

### Car-repository interactions:
1. Car client is running on *localhost:3000*
2. Use following API:
	* `/list` - list of available for installation packages
	* `/update` - get updated list of available packages
	* `/install/<pkg_name>` - install/update package

### Using the webpage:
1. Go to *localhost:3000/dev*
2. Upload some *.deb* package
3. Go to *localhost:3000/admin*
4. Here you can approve or reject packages before they are uploaded to the repository

### The webpage api
1. The api is found at *localhost:5001/*
2. */api*
	* `/users` - parent to user routes
		* `GET: /` - get all users
		* `POST: /` - create user
		* `GET: /:username` - get user
	* `/packages` - parent to package routes
		* `GET: /` - get all packages
		* `POST: /upload` - upload file
		* `POST: /approve` - approve file
		* `POST: /reject` - reject file
		* `POST: /reset` - reset file status
		* `GET: /delete/:id` - remove file with :id (should change method to DELETE)
		* `GET: /deleteAll`, delete all packages (this should also be DELETE)
		* `GET: /allFiles`, get metadata of all files
		* `GET: /:id/:filename`, get single file

See implementation details in *implementation_details*
