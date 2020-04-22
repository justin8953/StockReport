from twstock import Stock
from get_connect import Authentication
from google.cloud.exceptions import NotFound

# Authentication Google Firebase
authen = Authentication()
model = authen.db

# Fetch the watching Stock
new_docs = model.collection('stock').get()
stock_ids = [doc.id for doc in new_docs]

"""

This is for the document hasn't been created
Provide the dates, close, open, high, low, price 

"""


def update_not_exists_data(stock_ids):
    for stock_id in stock_ids:
        insert_values = []
        index = 0
        # Data We want to watch
        stock = Stock(stock_id)
        dates = stock.date[::-1]
        closes = stock.close[::-1]
        opens = stock.open[::-1]
        highs = stock.high[::-1]
        lows = stock.low[::-1]
        prices = stock.price[::-1]
        for date in dates:
            doc_ref = model.collection('stock').document(stock_id).collection(
                "daily").document(date.strftime("%Y-%m-%d"))
            if not doc_ref.get().exists:
                insert_value = {'date': date,
                                'close': closes[index],
                                'open': opens[index],
                                'high': highs[index],
                                'low': lows[index],
                                'price': prices[index],
                                }
                doc_ref.set(insert_value)
            index += 1


"""

This is to create the document in one time
Provide the dates, close, open, high, low, price 

"""


def update_all_data(stock_ids):
    for stock_id in stock_ids:
        insert_values = []
        index = 0
        # Data We want to watch
        stock = Stock(stock_id)
        dates = stock.date[::-1]
        closes = stock.close[::-1]
        opens = stock.open[::-1]
        highs = stock.high[::-1]
        lows = stock.low[::-1]
        prices = stock.price[::-1]
        for date in dates:
            doc_ref = model.collection('stock').document(stock_id).collection(
                "daily").document(date.strftime("%Y-%m-%d"))
            insert_value = {'date': date,
                            'close': closes[index],
                            'open': opens[index],
                            'high': highs[index],
                            'low': lows[index],
                            'price': prices[index],
                            }
            doc_ref.set(insert_value)
            index += 1


update_not_exists_data(stock_ids)


# Update All month
# update_all_data(stock_ids)
