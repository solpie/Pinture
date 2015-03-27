from bottle import get, run, static_file, post, route, request, redirect
import os
from php import PhP2

p = PhP2()


@get('/')
def index():
    if p.isLogin():
        return static_file('index.html', root='static')
    else:
        return redirect('/login/')


@post('/pin')
def pin():
    pass


@route('/login', method=['POST', 'GET'])
@route('/login/', method=['POST', 'GET'])
def login():
    if request.method == 'POST':
        ac = request.forms.get('ac')
        pw = request.forms.get('pw')
        p.login(ac, pw)
        redirect('/')
    else:
        return static_file('login.html', root='static')


@get('/js/<name>')
def js(name):
    return static_file(name, root='static/js')


@get('/css/<name>')
def js(name):
    return static_file(name, root='static/css')


@get('/img/<name>')
def img2(name):
    return static_file(name, root='dl')


from bottle import response
from json import dumps
# rv = [{ "id": 1, "name": "Test Item 1" }, { "id": 2, "name": "Test Item 2" }]
# response.content_type = 'application/json'
# return dumps(rv)
@get('/page')
@get('/page/')
def page():
    rv = {'total': 2, 'result': []}
    rv['total'] = 20
    for i in range(0, 20):
        rv['result'].append({
            "image": "http://127.0.0.1:8080/img/y.jpg",
            "width": 192,
            "height": 288
        })
    response.content_type = 'application/json'
    return dumps(rv)


run(host='127.0.0.1', reloader=True)