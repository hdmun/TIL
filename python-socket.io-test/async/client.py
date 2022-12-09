import socketio
import sys

from datetime import datetime


# standard Python
sio = socketio.Client()

@sio.event
def connect():
    print(datetime.now(), "I'm connected!")


@sio.event
def connect_error(data):
    print(datetime.now(), "The connection failed!")


@sio.event
def disconnect():
    print(datetime.now(), "I'm disconnected!")
    sys.exit(0)


@sio.event
def message(frame_number: int):
    print(datetime.now(), 'I received a message!', frame_number)


if __name__ == '__main__':
    sio.connect('http://localhost:3000', wait_timeout=10)
    print(datetime.now(), 'server connected')

    for i in range(10):
        sio.emit('message', i)
