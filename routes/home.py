from flask import Blueprint, render_template

home_bp = Blueprint('home', __name__)

@shopping_bp.route('/home')
def shopping_list():
    return render_template('home.html')
