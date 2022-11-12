import csv
import logging
import re
from datetime import datetime

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from telethon import TelegramClient
from telethon import functions
from telethon.tl.types import PeerChannel

import settings

logging.basicConfig(level=logging.INFO)

api_id = settings.tg_sec['api_id']
api_hash = settings.tg_sec['api_hash']
channel_id = settings.tg_sec['channel_id']
client = TelegramClient('tgparse', api_id, api_hash)

filename = f'events_{datetime.now().strftime("%H:%M:%S")}.csv'
key_words = [
    'приглаш', 'приглас', 'музык', 'танцы', 'программ', 'вечеринк', 'концерт', 'выставк',
    'встреч', 'начало', 'мероприят', 'приходите', 'лекция', 'ярмарк',
    'фестивал', 'спектакл', 'состоится'
]


async def Main():
    channel_entity = await client.get_entity(PeerChannel(channel_id))

    dialog = await client(functions.messages.GetPeerDialogsRequest(
        peers=[channel_id]
    ))
    dialog = dialog.dialogs[0]

    texts = []

    async for message in client.iter_messages(channel_id, limit=200):
        text = message.text
        if text is None:
            continue
        for key_word in key_words:
            if key_word in text.lower():
                texts.append(message.text)
                break

    texts = [s.replace(settings.tg_sec['remove_text'], '') for s in texts]

    with open(filename, mode='w') as events_file:
        events_writer = csv.writer(events_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        events_writer.writerow(['Description'])
        for text in texts:
            events_writer.writerow([text])


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