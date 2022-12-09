import asyncio
import socketio

from aiohttp import web
from datetime import datetime


sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)


@sio.event
def connect(sid: str, environ: dict):
    print(datetime.now(), 'connect ', sid, environ.keys())


@sio.event
def disconnect(sid: str):
    print(datetime.now(), 'disconnect ', sid)


@sio.event
async def message(sid: str, frame_number: int):
    print(datetime.now(), 'message from ', sid, frame_number)

    if frame_number == 3:
        print(datetime.now(), 'long processing...', sid, frame_number)
        await asyncio.sleep(2)

    await sio.emit('message', frame_number, to=sid)


if __name__ == '__main__':
    print('server start')
    web.run_app(app, host='0.0.0.0', port=3000)
    print('server end')
