from flask import Flask, jsonify, make_response, request
from response import response
app = Flask(__name__)

@app.route('/sentiment')
def sentiment_analysis():
    """method that outputs a response"""
    if request.method == 'GET':
        text = request.args.get('text')
        return response(text)
    return make_response(jsonify({'error': 'sorry! unable to parse', 'status_code': 500}), 500)

# We only need this for local development.
if __name__ == '__main__':
 app.run()