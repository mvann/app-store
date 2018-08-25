import apt
import apt.progress
from flask import Flask
import apt_pkg
import json

app = Flask(__name__)

is_cache_updated = False

def pkg_trusted(pkg):
	return len(pkg.candidate.origins) > 0 and pkg.candidate.origins[0].trusted

def pkg_maintainer(pkg):
	return pkg.candidate.record['Maintainer']

def parse_pkg(pkg):
	return {'name': pkg.shortname,
			'fullname': pkg.fullname,
			'description': pkg.candidate.description,
			'id': pkg.id,
			'version': pkg.candidate.version,
			'maintainer': pkg_maintainer(pkg),
			'trusted': pkg_trusted(pkg)}

def update_impl():
	response = {'status': True}

	try:
		cache = apt.Cache()
		# cache.clear()
		cache.update()
		cache.open(None)
		cache.commit()
		is_cache_updated = True
	except Exception as err:
		response['status'] = False
		response['error'] = 'Package cache update failed'
		response['code'] = str(err)

	return response

@app.route('/update')
def update():
	return json.dumps(update_impl())

@app.route('/list')
def list_packages():
	if not is_cache_updated:
		update_res = update_impl()
		if not update_res['status']:
			return update_res
	
	cache = apt.Cache()
	response = {'status': True, 'available': [], 'upgradable': [], 'installed': []}
	for pkg in cache:
		if pkg_maintainer(pkg) != 'iprokofy-mvann':
			continue

		pkg_info = parse_pkg(pkg)

		if pkg.is_upgradable:
			response['upgradable'].append(pkg_info)
		elif pkg.is_installed:
			response['installed'].append(pkg_info)
		else:
			response['available'].append(pkg_info)

	return json.dumps(response)

@app.route('/install/<pkg_id>')
def install(pkg_id):
	response = {'status': True}

	try:
		cache = apt.Cache()
		pkg = cache[pkg_id]
		if not pkg_trusted(pkg):
			raise Exception('origin is not trusted')

		pkg.mark_install()
		cache.update()
		cache.commit()
	except Exception as err:
		response['status'] = False
		response['error'] = 'Package installation failed'
		response['code'] = str(err)

	return json.dumps(response)