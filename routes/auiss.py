from flask import Blueprint, render_template

auiss_bp = Blueprint('auiss', __name__)

@auiss_bp.route('/auiss')
def auiss():
    return render_template('auis.html')
