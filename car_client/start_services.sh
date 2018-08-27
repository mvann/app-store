#!/bin/sh

export FLASK_APP=/app/car.py
flask run --host=0.0.0.0 &
bash