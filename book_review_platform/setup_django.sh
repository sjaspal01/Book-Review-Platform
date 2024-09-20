#!/bin/bash

set -e

echo "Installing Django and other dependencies..."
pip install -r requirements.txt

echo "Applying migrations..."
python manage.py migrate

echo "Starting Django development server..."
python manage.py runserver

