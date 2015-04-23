from php import PinHE
from testConf import *
from conf import *
from time import time
import base64
import hashlib
#

def testMuLo():
    p = PinHE()
    p.login(ac, pw)
    f = open(r'dl\test.jpg', 'rb')
    img64 = base64.b64encode(f.read()).decode('utf-8')
    f.close()

    mulo = {
        'id': '',
        'date': str(int(time())),
        'title': 'hello mulo',
        'text': '我是内容2',
        'attachment': [
            {
                'idx': 0,
                'payload': img64,
                'type': 'image'},
            {
                'idx': 1,
                'payload': 'base64',
                'type': 'audio'}
        ]}

    hash_md5 = hashlib.md5(mulo['date'])
    mulo['id'] = hash_md5

    #
    # p.sendMuLo(mulo, ac)
    # p.getMuLo()


def testUpload():
    p = PinHE()
    p.IMAP_SERVER = IMAP_outlook
    # p.login("pixtch@live.com", pw2)
    p.smtp_pw = pw2
    p.smtp_ac = 'pixtch@live.com'
    p.rev_addrs = ['solpie@163.com',
                   # 'pixtch@live.com',
                   # 'solpie@163.com',
                   # 'solpie@sina.com'
                   ]
    p.sendImage(
        'http://anime-pictures.net/pictures/get_image/418123-800x800-fate+%28series%29-fatestay+night-type-moon-toosaka+rin-byulrorqual-long+hair.png')
    pass


def testInit():
    p = PinHE()
    p.login(ac, pw)
    p.initPinture()


# testUpload()
testInit()
