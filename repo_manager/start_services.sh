#!/bin/sh

python3 -m http.server &
export FLASK_APP=/app/publisher.py
flask run --host=0.0.0.0