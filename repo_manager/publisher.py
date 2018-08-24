import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
import deb_pkg_tools.repo
from deb_pkg_tools.gpg import GPGKey

UPLOAD_FOLDER = '/repo'
ALLOWED_EXTENSIONS = set(['deb'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            
            deb_pkg_tools.repo.scan_packages(UPLOAD_FOLDER, packages_file=(UPLOAD_FOLDER + '/Packages'), cache=None)
            key = deb_pkg_tools.gpg.GPGKey(secret_key_file='/secret/secring.gpg', public_key_file='/secret/pubring.gpg', key_id=None)
            
            deb_pkg_tools.repo.update_repository(UPLOAD_FOLDER, gpg_key=key)
            return redirect(url_for('upload_file', filename=filename))
    if request.method == 'GET':
        print('get method')
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''