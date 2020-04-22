from get_connect import Authentication
from google.cloud.exceptions import NotFound

"""
TO DO 
Make better usage for ORM Sturcute
1. Create 
    - Collection
    - Document
    - Ddata
2. Update
3. GET with condition
4. Retrieve with condition
5. Delete

"""


class GoogleDB:

    def __init__(self):
        authen = Authentication()
        self.db = authen.db

    def insert_data(self, **args):
        db = self.db
        data_set = args.get('set', None)
        data_key = args.get('key', None)
        data_value = args.get('value', None)
        if data_set:
            collection_set = db.collection(data_set)
        if data_key:
            doc_ref = collection_set.document(data_key)
        if data_value:
            insert_values = doc_ref.set(data_value)
        else:
            doc_ref.set(data_value)
            insert_values = collection_set.get()

        return insert_values

    def update_data(self, **args):
        db = self.db
        data_set = args.get('set', None)
        data_key = args.get('key', None)
        data_value = args.get('value', None)
        if data_set:
            doc_ref = db.collection(data_set)
        if data_set:
            doc_ref = doc_ref.document(data_key)
        if data_value:
            update_value = doc_ref.update(data_value)

        return update_value

    def get_data(self, **args):
        db = self.db
        data_set = args.get('set', None)
        if not data_set:
            raise Exception('Please provide the collection name')
        data_key = args.get('key', None)
        if not data_key:
            raise Exception('Please provide the key name')
        doc_ref = db.collection(data_set).document(data_key)
        try:
            doc = doc_ref.get()
            return doc.to_dict()
        except NotFound:
            print('No such file')

    def get_documents(self, **args):
        db = self.db
        data_set = args.get('set', None)
        if not data_set:
            raise Exception('Please provide the collection name')
        doc_ref = db.collection(data_set).get()
        return doc_ref


def test_case():
    model = GoogleDB()
    data = {
        'set': 'user',
        'key': 'justin',
        'value': {
            'first_name': 'justin',
            'last_name': 'lan',
        }
    }
    search_data = {
        'set': 'user',
        'key': 'justin'
    }

    new_data = model.insert_data(**data)

    print(new_data)

    looking_data = model.get_data(**search_data)

    print(looking_data)
