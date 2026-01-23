from flask import Blueprint, render_template

shopping_bp = Blueprint('auiss', __name__)

@shopping_bp.route('/auiss')
def shopping_list():
    return render_template('auiss.html')
