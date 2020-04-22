from flask import Flask, jsonify, request
from flask_cors import CORS
from get_connect import Authentication
from datetime import datetime, date, timedelta
from google.cloud.exceptions import NotFound
import pandas as pd

authen = Authentication()
model = authen.db

app = Flask(__name__)
cors = CORS(app, resources=r'/api/*')


def diff(index, df, offset):
    if index > offset:
        compareId = index-offset
        start = df[df.index == compareId]['price']
        end = df[df.index == index]['price']
        frac = (float(end)-float(start))/float(start)
    else:
        frac = 0
    return frac


def get_standard(frac):
    fluctuation = []
    for value in frac:
        if value >= 0.1:
            fluctuation.append(2)
        elif value < 0.1 and value >= 0.05:
            fluctuation.append(1)
        elif value < 0.05 and value >= 0:
            fluctuation.append(0)
        elif value < 0 and value >= -0.05:
            fluctuation.append(-1)
        else:
            fluctuation.append(-2)
    return fluctuation


@app.route('/api/tracking/', methods=['POST'])
def post_stock():
    request_data = request.get_json()
    stock_id = request_data.pop('stock_id')
    model.collection('stock').document(stock_id).set(None)
    new_docs = model.collection('stock').get()
    new_data = []
    for doc in new_docs:
        stock_data = {}
        stock_data['stock_id'] = doc.id
        stock_data.update(doc.to_dict())
        new_data.append(stock_data)

    return jsonify({'stock': new_data})


@app.route('/api/tracking/')
def get_stock_list():
    params = dict(request.args)
    today = date.today()
    offset = max(1, (today.weekday() + 6) % 7 - 3)
    last_date = (today - timedelta(offset))

    new_docs = model.collection('stock').get()
    new_data = []
    for doc in new_docs:
        stock_data = {}
        stock_data['stock_id'] = doc.id
        stock_docs = model.collection('stock').document(
            doc.id).collection('daily').document(last_date.strftime("%Y-%m-%d")).get().to_dict()
        stock_data.update(stock_docs)
        new_data.append(stock_data)
    return jsonify({'stock_list': new_data})


@app.route('/api/stock/')
def get_stock_report():
    stock_id = request.args.get("stock_id")
    new_docs = model.collection('stock').document(
        stock_id).collection('daily').stream()
    new_data = [doc.to_dict() for doc in new_docs]
    df = pd.DataFrame(new_data)
    num = len(df.index)
    frac = [diff(index, df, 5) for index in range(num)]
    fluctuation = get_standard(frac)
    index = 0
    for data in new_data:
        data['fluctuation'] = fluctuation[index]
        data['frac'] = frac[index]
        index += 1
    return jsonify({'stock_report': new_data})


if __name__ == "__main__":
    app.run(debug=True)
