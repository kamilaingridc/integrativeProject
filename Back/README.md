pip install virtualenv
py -m venv env
env\Scripts>activate
pip install django
django-admin startproject SmartCity
cd smartcity
python manage.py startapp App_
python manage.py startapp App_User
python manage.py migrate 

# admin e admin
