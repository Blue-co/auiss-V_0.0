import os
from flask import Flask

app = Flask(__name__)

# 환경 변수에서 비밀키와 포트 가져오기
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_key_123')
port = int(os.environ.get("PORT", 10000)) # Render는 기본적으로 10000번 혹은 제공된 포트를 사용함

@app.route('/')
def hello():
    return "Hello, Flask on Render!"

if __name__ == "__main__":
    # 로컬 테스트용 환경에서는 port를 사용하고, 
    # 실제 배포 환경(Gunicorn)에서는 이 블록이 실행되지 않아도 괜찮습니다.
    app.run(host='0.0.0.0', port=port)
