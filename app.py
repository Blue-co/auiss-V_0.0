import os
from flask import Flask, render_template

#app.py

app = Flask(__name__, static_url_path='/static')

# 환경 변수에서 비밀키와 포트 가져오기

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_key_123')
port = int(os.environ.get("PORT", 10000))

@app.route('/')
def hello():
    return render_template('auis.html')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=port)
