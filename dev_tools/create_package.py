import os
import sys
import tarfile
import deb_pkg_tools.package
import deb_pkg_tools.control

def make_tarfile(output_filename, source_dir):
    with tarfile.open(output_filename, "w:gz") as tar:
        tar.add(source_dir, arcname=os.path.basename(source_dir))

if len(sys.argv) < 2:
	print("enter the path to src")
	exit()
else:
	args = str(sys.argv[1]).strip('/').split('/')
	src = args[len(args) - 1]
	src_tar = src + ".tar.gz"

print("src: %s" % src)
path = "debian/"
os.system("mkdir -p " + path)
make_tarfile(path + src_tar, src)

control_file_name = path + "DEBIAN/control"
default_control_fields = {'Architecture': 'all',\
	'Description': 'hello',\
	'Maintainer': 'iprokofy-mvann',\
	'Package': 'hello-sh',\
	'Version': '1.0'}
deb_pkg_tools.control.create_control_file(control_file_name, default_control_fields)
print(deb_pkg_tools.package.determine_package_archive('debian'))
print(deb_pkg_tools.package.build_package(path, repository=None, check_package=True, copy_files=True))

os.system("rm -rf " + path)