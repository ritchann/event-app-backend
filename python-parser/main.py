import settings

import logging
from datetime import datetime

from telethon import TelegramClient
from telethon.tl.types import PeerChannel
from telethon import functions, types
from telethon.utils import pack_bot_file_id

logging.basicConfig(level=logging.INFO)

api_id = settings.tg_sec['api_id']
api_hash = settings.tg_sec['api_hash']
channel_id = settings.tg_sec['channel_id']
client = TelegramClient('tgparse', api_id, api_hash)

async def Main():
    channel_entity = await client.get_entity(PeerChannel(channel_id))
    
    dialog = await client(functions.messages.GetPeerDialogsRequest(
        peers=[channel_id]
    ))
    dialog = dialog.dialogs[0]
    
    async for msg in client.iter_messages(channel_id, limit=10):
        print(msg.text)

with client:
    client.loop.run_until_complete(Main())