from bottle import get, run, static_file, post, route, request, redirect
import os
from conf import *

test = {}
test['isLogin'] = False


@get('/')
def index():
    if p.isLogin() or test['isLogin']:
        return static_file('index.html', root='static')
    else:
        return redirect('/login/')


@post('/pin')
def pin():
    pass


@post('/set/info')
def set_info():
    id = request.get('id')
    board = request.get('board')
    pass


@post('/upload')
@post('/')
def do_upload():
    img = request.files['file']
    chuck = img.file.read()
    f2 = open(PHOTOS_PATH + img.filename, 'wb')
    f2.write(chuck)
    f2.close()
    pass


@get('/upload')
def upload():
    return static_file('upload.html', root='static')


@route('/login', method=['POST', 'GET'])
@route('/login/', method=['POST', 'GET'])
def login():
    if request.method == 'POST':
        ac = request.forms.get('ac')
        pw = request.forms.get('pw')
        if ac == 'test':
            test['isLogin'] = True
            redirect('/')
        else:
            p.login(ac, pw)
        redirect('/')
    else:
        return static_file('login.html', root='static')


@get('/sel/<path>')
def select(path):
    path = 'Inbox'
    p.select(path)
    pass


@get('/list')
def list():
    p.list()
    pass


@get('/js/<name>')
def js(name):
    return static_file(name, root='static/js')


@get('/css/<name>')
def js(name):
    return static_file(name, root='static/css')


@get('/img/<name:path>')
def img(name):
    print(name)
    return static_file(name, root='dl/')


from bottle import response
from json import dumps
# rv = [{ "id": 1, "name": "Test Item 1" }, { "id": 2, "name": "Test Item 2" }]
# response.content_type = 'application/json'
# return dumps(rv)


@get('/page')
@get('/page/')
def page():
    count = 20
    rv = []
    imgs = pt.getPage(count)
    for i in imgs:
        rv.append({
            "image": "/img/" + i.refPath,
            "desc": 'desc...',
            "sw": i.width,
            "sh": i.height,
            "width": 250,
            "height": int(i.height * 250 / i.width)
        })
    response.status = 200
    response.content_type = 'application/json'
    return dumps(rv)

##############################
from php import PinHE
#
p = PinHE()
# test
from sys import argv
# p.login(test_ac, test_pw)
# p.upload()
# p.initPinture()
# imgDB = ImgDB()
####################################
from pinture import Pinture

pt = Pinture()

if len(argv) > 1:
    run(host='0.0.0.0', port=argv[1], debug=True)
else:
    run(host='127.0.0.1', reloader=True, debug=True)