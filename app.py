# richiedi tutti i moduli necessari
from flask import Flask,render_template,request,jsonify

# dichiara la variabile app
app = Flask(__name__)

# prima route, dove l'utente deve andare per accedere alla pagina
@app.route('/')
def homepage():
    return render_template('index.html')

# Starta il webserverw
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3246, debug=True)