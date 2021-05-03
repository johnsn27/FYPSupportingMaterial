
import pickle
import matplotlib.pyplot as plt
import pandas as pd
from flask import jsonify, make_response

def highlight_words(text):
    """returns the words in the text that caused the sentiment to be too extreme"""
    train_data = pickle.load(open('./models/train_data_RF.sav', 'rb'))
    classifier = pickle.load(open('./models/classifierRF.sav', 'rb'))
    list_of_words = pd.Series(classifier.feature_importances_, index=train_data.columns)
    most_extreme_words_value = list_of_words.nlargest(36)
    most_extreme_words = most_extreme_words_value.keys()
    list_of_input_words = text.split(" ")
    words_to_highlight = []
    for word in most_extreme_words:
        for inputted_word in list_of_input_words:
            if word == inputted_word:
                words_to_highlight.append(word)
    return make_response(
        jsonify({'words': words_to_highlight}), 200)