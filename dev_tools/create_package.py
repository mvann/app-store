import os
import sys
import tarfile
import deb_pkg_tools.package
import deb_pkg_tools.control
from shutil import copyfile, copytree
import tempfile

# export DPT_ALLOW_FAKEROOT_OR_SUDO=false
# export DPT_CHOWN_FILES=false
# export DPT_RESET_SETGID=false
# export DPT_SUDO=false

if len(sys.argv) < 4:
	print("usage: python create_package.py <path> <pkg_name> <version>")
	exit()
else:
	# args = str(sys.argv[1]).strip('/').split('/')
	src = sys.argv[1]
	pkg_name = sys.argv[2]
	version = sys.argv[3]

temp_path = tempfile.mkdtemp()
print(temp_path)

# path = "debian/"
# os.system("mkdir -p " + path)
#make_tarfile(path + src_tar, src)

control_file_name = temp_path + "/DEBIAN/control"
default_control_fields = {'Architecture': 'all',\
	'Description': pkg_name,\
	'Maintainer': 'iprokofy-mvann',\
	'Package': pkg_name,\
	'Version': version}
deb_pkg_tools.control.create_control_file(control_file_name, default_control_fields)

os.system("cp -r " + src + "/* " + temp_path)
package_name = deb_pkg_tools.package.determine_package_archive(temp_path)
deb_path = deb_pkg_tools.package.build_package(temp_path, repository=None, check_package=False, copy_files=True)
copyfile(deb_path, package_name)
# os.system("rm -rf " + path)
