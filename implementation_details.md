# Details of implementation:
## Dev tools:
* Packs source code to proper format
* Creates control file for the package
* Signs package up for repository with private and public key

## Debian package:
* **Data.tar.xz** - stores sources of the application ready to be installed using apt-get
* **Control** file - stores the whole meta information about application: name, size, version, description, icon, maintainer, hash sum and more
* Example of control file:
  ```
  Installed-Size: 16
  Package: another-sh
  Maintainer: iprokofy-mvann
  Architecture: all
  Version: 1.0
  SHA1: d0a0c93f3660c5761b3b6b8e36a7416aab9dc6ec
  Filename: another-sh_1.0_all.deb
  SHA256: d8e0267f43c154c0634ef9fef78e8898f529d9fb159f6745b691bc324a6a4bf6
  Priority: optional
  Description: another
  MD5sum: 675da27daa4bc2b53f1fa0ba2009cfd7
  Size: 828
  Section: misc
  ```
## Debian repository:
* Using simplified version of debian repository
* Content:
	* List of .deb packages ready to be picked up by apt-get for installation
	* **Packages** file: contains meta information about all packages currently stored in repo
	* **Release** file: stores current state of the repository (size and hash sums of current content)

## Webpage
* The webpage is built using react
* It uses the template created by create-react-app

## Webpage Backend and API
* The webpage backend is written using express and node

## MongoDB
* The database is a MongoDB Atlas instance
* It is controlled through node with mongoose
* The program uses MongoDB's GridFS to store and retrieve files
