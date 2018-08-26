import os
import sys
import tarfile
import deb_pkg_tools.package
import deb_pkg_tools.control
from shutil import copyfile, copytree
import tempfile
import base64

# export DPT_ALLOW_FAKEROOT_OR_SUDO=false
# export DPT_CHOWN_FILES=false
# export DPT_RESET_SETGID=false
# export DPT_SUDO=false

if len(sys.argv) < 4:
	print("usage: python create_package.py <path> <pkg_name> <version> [icon_path]")
	exit()
else:
	src = sys.argv[1]
	pkg_name = sys.argv[2]
	version = sys.argv[3]

encoded_icon = ''
if len(sys.argv) > 3:
	icon_path = sys.argv[4]
	with open(icon_path, "rb") as image_file:
		encoded_icon = base64.b64encode(image_file.read())

temp_path = tempfile.mkdtemp()
print(temp_path)

control_file_name = temp_path + "/DEBIAN/control"
default_control_fields = {'Architecture': 'all',\
	'Description': pkg_name,\
	'Maintainer': 'iprokofy-mvann',\
	'Package': pkg_name,\
	'Version': version,
	'Icon': encoded_icon.decode("utf-8")}
deb_pkg_tools.control.create_control_file(control_file_name, default_control_fields)

os.system("cp -r " + src + "/* " + temp_path)
package_name = deb_pkg_tools.package.determine_package_archive(temp_path)
deb_path = deb_pkg_tools.package.build_package(temp_path, repository=None, check_package=False, copy_files=True)
copyfile(deb_path, package_name)
# os.system("rm -rf " + path)
