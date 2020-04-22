import os
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

"""
Connecting to FireBase
- Set ProjectID or Key File Path in environment

TODO:
    1. Put Key file into cloud
    
"""


class Authentication:

    def __init__(self):
        self.fileName = os.environ.get('keyFileName', None)
        self.projectID = os.environ.get('projectID', None)
        self.db = self.conn()

    def conn(self):
        fileName = self.fileName
        projectID = self.projectID
        if fileName is not None:
            pathName = "server/{}".format(fileName)
            file_path = os.path.join(os.getcwd(), pathName)
            cred = credentials.Certificate(file_path)
            firebase_admin.initialize_app(cred)
        else:
            if projectID:
                raise Exception("Please provide project ID or key file")
            cred = credentials.ApplicationDefault()
            firebase_admin.initialize_app(cred, {
                'projectId': projectID,
            })

        db = firestore.client()

        return db
