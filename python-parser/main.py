import csv
import logging
import re
from datetime import datetime

import numpy as np
import pandas as pd
from googletrans import Translator
from sklearn.feature_extraction.text import CountVectorizer
from telethon import TelegramClient
from telethon import functions
from telethon.tl.types import PeerChannel

import settings
from constants import key_words, stop_words, cities, categories

logging.basicConfig(level=logging.INFO)

api_id = settings.tg_sec['api_id']
api_hash = settings.tg_sec['api_hash']
channel_id = settings.tg_sec['channel_id']
client = TelegramClient('tgparse', api_id, api_hash)


async def Main():
    # await parse_events_to_csv()
    add_columns()


async def parse_events_to_csv():
    channel_entity = await client.get_entity(PeerChannel(channel_id))

    dialog = await client(functions.messages.GetPeerDialogsRequest(
        peers=[channel_id]
    ))
    dialog = dialog.dialogs[0]

    texts = []

    async for message in client.iter_messages(channel_id, limit=500):
        if message.text is None:
            continue
        text = message.text.replace(settings.tg_sec['remove_text'], '')
        text = re.sub(r'[\S]+\.(jpg|mp4)[\S]*\s?', '', text)

        if not all(word not in text for word in stop_words):
            continue

        for key_word in key_words:
            if key_word in text.lower():
                texts.append(text)
                break

    filename = f'events_{datetime.now().strftime("%H:%M:%S")}.csv'
    with open(filename, mode='w') as events_file:
        events_writer = csv.writer(events_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        events_writer.writerow(['Description'])
        for text in texts:
            events_writer.writerow([text])


def add_columns():
    df = pd.read_csv('events_22_58_19_ok_version.csv')

    event_cities = {}
    event_categories = {}
    event_prices = {}
    event_is_paid = {}

    for index, row in df.iterrows():
        text = row['Description']
        event_cities[text] = ''
        event_categories[text] = ''
        event_prices[text] = ''
        event_is_paid[text] = 'False'

        # City
        for key, value in cities.items():
            if any(city.lower() in text.lower() for city in value):
                event_cities[text] = key
                break

        # Category
        for key, value in categories.items():
            if any(word.lower() in text.lower() for word in value):
                event_categories[text] = key

        # Payment Information
        price = ''
        euro = re.findall('(?:[,\d]+.?\d*[евро]{4})', text)
        euro_sign = re.findall('(?:[,\d]+.?\d*[€]{1})', text)
        if euro:
            price = euro[0]
        elif euro_sign:
            price = euro_sign[0]
        price = re.sub('[^0-9]', '', price)
        if len(price) > 0:
            event_prices[text] = f'{price} €'
            event_is_paid[text] = 'True'

    df['City'] = df['Description'].map(event_cities)
    df['Category'] = df['Description'].map(event_categories)
    df['Payment Information'] = df['Description'].map(event_prices)
    df['Paid'] = df['Description'].map(event_is_paid)

    for index, row in df.iterrows():
        translator = Translator()
        row['Description'] = translator.translate(row['Description'], dest='en').text

    df.to_csv(f'events_final_{datetime.now().strftime("%H:%M:%S")}.csv')


def get_key_words(texts: str):
    vectorizer = CountVectorizer()
    docs = np.array(texts)
    bag = vectorizer.fit_transform(docs)

    df = pd.DataFrame(bag.toarray(), columns=vectorizer.get_feature_names())
    for column in df:
        name = df[column].name
        if not bool(re.search('[а-яА-Я]', name)):
            df = df.drop(column, axis=1)
        elif len(name) < 4:
            df = df.drop(column, axis=1)

    df.loc['Total'] = df.sum(numeric_only=True)
    df = df.sort_values(by='Total', axis=1, ascending=False)
    nd = df.loc[['Total']]
    nd.to_csv('key_words.csv')


with client:
    client.loop.run_until_complete(Main())