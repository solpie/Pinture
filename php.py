#!/usr/bin/env python
# encoding=utf8

import struct
import imghdr


def get_image_ext(fname):
    fhandle = open(fname, 'rb')
    head = fhandle.read(24)
    if len(head) != 24:
        return
    if imghdr.what(fname) == 'png':
        check = struct.unpack('>i', head[4:8])[0]
        if check != 0x0d0a1a0a:
            return
        width, height = struct.unpack('>ii', head[16:24])
    elif imghdr.what(fname) == 'gif':
        width, height = struct.unpack('<HH', head[6:10])
    elif imghdr.what(fname) == 'jpeg':
        try:
            fhandle.seek(0)  # Read 0xff next
            size = 2
            ftype = 0
            while not 0xc0 <= ftype <= 0xcf:
                fhandle.seek(size, 1)
                byte = fhandle.read(1)
                while ord(byte) == 0xff:
                    byte = fhandle.read(1)
                ftype = ord(byte)
                size = struct.unpack('>H', fhandle.read(2))[0] - 2
            # We are at a SOFn block
            fhandle.seek(1, 1)  # Skip `precision' byte.
            height, width = struct.unpack('>HH', fhandle.read(4))
        except Exception:  # IGNORE:W0703
            return
    else:
        return
    return imghdr.what(fname)


from io import BytesIO, FileIO


def get_image_siez_by_Bytes(file):
    head = file.read(24)
    fhandle = file
    if len(head) != 24:
        return
    file.seek(0)
    what = imghdr.what(file)
    if what == 'png':
        check = struct.unpack('>i', head[4:8])[0]
        if check != 0x0d0a1a0a:
            return
        width, height = struct.unpack('>ii', head[16:24])
    elif what == 'gif':
        width, height = struct.unpack('<HH', head[6:10])
    elif what == 'jpeg':
        try:
            fhandle.seek(0)  # Read 0xff next
            size = 2
            ftype = 0
            while not 0xc0 <= ftype <= 0xcf:
                fhandle.seek(size, 1)
                byte = fhandle.read(1)
                while ord(byte) == 0xff:
                    byte = fhandle.read(1)
                ftype = ord(byte)
                size = struct.unpack('>H', fhandle.read(2))[0] - 2
            # We are at a SOFn block
            fhandle.seek(1, 1)  # Skip `precision' byte.
            height, width = struct.unpack('>HH', fhandle.read(4))
        except Exception:  # IGNORE:W0703
            return
    else:
        return
    return width, height, what


def get_image_size(fname):
    fhandle = open(fname, 'rb')
    head = fhandle.read(24)
    if len(head) != 24:
        return
    if imghdr.what(fname) == 'png':
        check = struct.unpack('>i', head[4:8])[0]
        if check != 0x0d0a1a0a:
            return
        width, height = struct.unpack('>ii', head[16:24])
    elif imghdr.what(fname) == 'gif':
        width, height = struct.unpack('<HH', head[6:10])
    elif imghdr.what(fname) == 'jpeg':
        try:
            fhandle.seek(0)  # Read 0xff next
            size = 2
            ftype = 0
            while not 0xc0 <= ftype <= 0xcf:
                fhandle.seek(size, 1)
                byte = fhandle.read(1)
                while ord(byte) == 0xff:
                    byte = fhandle.read(1)
                ftype = ord(byte)
                size = struct.unpack('>H', fhandle.read(2))[0] - 2
            # We are at a SOFn block
            fhandle.seek(1, 1)  # Skip `precision' byte.
            height, width = struct.unpack('>HH', fhandle.read(4))
        except Exception:  # IGNORE:W0703
            return
    else:
        return
    return width, height

###############################################
from conf import *

# Import the email modules we'll need
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.message import Message
import smtplib
import re
import email

pattern_uid = re.compile('\d+ \(UID (?P<uid>\d+)\)')

from imapclient import IMAPClient

import semidbm

import os

import jsonpickle
import json
import hashlib
import time


class ImgDB():
    def __init__(self):
        if not os.path.exists('db/data'):
            self.db = semidbm.open('db/', 'c')
        else:
            self.db = semidbm.open('db/', 'c')
            self.dump()
        # self.test()
        pass

    def test(self):
        start = time.clock()
        for mid in range(1, 20000):
            midStr = str(mid)
            ms = hashlib.sha1(midStr.encode()).hexdigest()
            self.add(Img(ms))
        self.db.close()
        end = time.clock()
        print('time', (end - start))
        pass

    def add(self, img):
        try:
            v = self.db[img.id]
            print('id conflict')
        except Exception:
            self.db[img.id] = img.toJSON()
            pass

    def dump(self):
        start = time.clock()
        for img in self.db.values():
            jstr = img.decode()
            j = jsonpickle.decode(jstr)
            print(j)
        end = time.clock()
        print('time', (end - start))


class Img():
    def __init__(self, id=None):
        if id:
            self.id = id
        else:
            self.id = 0
        self.name = ''
        self.ref_name = ''  # 源文件名
        self.ref_url = ''
        self.date = 0
        self.tags = []
        self.type = ''
        self.width = 0
        self.height = 0
        self.size = 0
        self.board = ''
        self.hash = ''
        # local attri
        self.path = ''
        self.refPath = ''
        pass

    def toJSON(self):
        j = jsonpickle.encode(self)
        return j

    def toMinJSON(self):
        j = json.loads(self.toJSON())
        del j['py/object']
        dels = []
        for key in j.keys():
            if not j[key]:
                dels.append(key)
        for key in dels:
            del j[key]

        info = json.dumps(j)
        return info

    def createMeta(self, path):
        self.width, self.height = get_image_size(path)
        pass


class PinHE():
    def __init__(self):
        self.IMAP_SERVER = IMAP_163
        self.IMAP_PORT = 993
        self.SMTP_SERVER = SMTP_OUT_LOOK
        self.client = IMAPClient(host=self.IMAP_SERVER['url'], ssl=True)
        self.ac = ''
        self.pw = ''
        self.rev_addrs = []
        self.smtp_ac = ''
        self.smtp_pw = ''
        self.has_pinture = False
        self._isLogin = False
        if debug_view:
            self._isLogin = True
        pass

    def getMuLo(self, folder='MuLo'):
        state = self.client.select_folder(folder.encode(), readonly=True)
        # result = self.client.search('UNSEEN')
        result = self.client.search('NOT DELETED')
        print(result)

        msgdict = self.client.fetch(result, ['RFC822'])
        for message_id, message in msgdict.items():
            message_contents = message[b'RFC822'].decode('utf-8')
            e = email.message_from_string(message_contents)
            print(e)
            self.walkMuLo(e)
        pass

    def walkMuLo(self, email):
        # part email.message.Message
        msg = Message()
        msg.get_payload()
        for message in email.walk():
            if message.is_multipart():
                continue
            payload = message.get_payload()
            data = json.loads(payload)
            print(data['text'])
        pass

    def sendMuLo(self, data, email):
        title = data['title']
        msg = MIMEMultipart()
        msg['From'] = "MuLo"
        msg['To'] = email
        msg['Subject'] = title
        muloData = json.dumps(data)
        msgText = MIMEText(muloData)
        msg.attach(msgText)
        try:
            s = smtplib.SMTP(SMTP_163)
            s.login(self.ac, self.pw)
            ret = s.sendmail(self.ac, self.ac, msg.as_string())
            s.quit()
            print('send sus', ret)
        except Exception:
            print('send failed!')
        pass

    def sendImage(self, url):
        # url = 'http://imglf1.ph.126.net/-Vn1I1WEUk7cYdTRx54ZyQ==/6630711523931898784.png'
        user_agent = 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1870.2 Safari/537.36'
        headers = {'User-Agent': user_agent}
        req = urllib.request.Request(url, headers=headers)
        res = urllib.request.urlopen(req)
        file = BytesIO()
        file.write(res.read())
        file.seek(0)
        img_width, img_height, img_type = get_image_siez_by_Bytes(file)

        file.seek(0)
        md5_str = md5_bytes(file.read())
        img = Img()
        img.width = img_width
        img.height = img_height
        img.type = img_type
        img.name = md5_str + '.' + img_type
        img.hash = md5_str
        img.tags = ['2', '3', 'pose']
        img.board = 'pose'
        img.ref_url = url
        img.date = str(int(time.time()))
        img.info = img.toMinJSON()
        # print(info)
        # info['py/object'] = 'php.Img'
        # info = info[:-1]+',"py/object":"php.Img"}'
        # testImg = jsonpickle.decode(info)
        img.fp = file

        self.uploadImg(img)
        pass

    def login(self, username, password):
        self.ac = username
        self.pw = password
        ret = self.client.login(username, password)
        print(ret)
        if ret == self.IMAP_SERVER['login_sus']:
            self._isLogin = True
            pass
        pass

    # todo delete old func
    # def upload(self, imgObj=None):
    # if not imgObj:
    # imgObj = Img()
    #         imgObj.tags = ['2', '3', 'hair']
    #         imgObj.board = '2'
    #         pass
    #     attachment = 'images/2.jpg'
    #     img_width, img_height = get_image_size(attachment)
    #     ext = get_image_ext(attachment)
    #     md5_str = md5_bytes(open(attachment, 'rb').read())
    #     if ext:
    #         file_name = md5_str + '.' + ext
    #     else:
    #         raise Exception('unknown ext')
    #     msg = MIMEMultipart()
    #     msg['From'] = self.ac
    #     msg['To'] = self.ac
    #     msg['Subject'] = "pinture"
    #     # msgText = MIMEText('<b>%s</b><br><img src="cid:bob.jpg"><br>' % body, 'html')
    #     msgText = MIMEText('<img src="cid:%s" width="%spx" height="%spx">' % (file_name, img_width, img_height), 'html')
    #     msg.attach(msgText)  # Added, and edited the previous line
    #
    #     fp = open(attachment, 'rb')
    #     msgImg = MIMEImage(fp.read())
    #     fp.close()
    #     msgImg.add_header('Content-ID', file_name)
    #     tags = '#'.join(imgObj.tags)
    #     msgImg.add_header('tags', tags)
    #     msgImg.add_header('board', imgObj.board)
    #     msg.attach(msgImg)
    #     try:
    #         s = smtplib.SMTP(SMTP_163)
    #         s.login(self.ac, self.pw)
    #         ret = s.sendmail(self.ac, self.ac, msg.as_string())
    #         s.quit()
    #         print('send sus', ret)
    #     except Exception:
    #         print('send failed!')
    #     pass

    def isLogin(self):
        return self._isLogin

    def select(self, folder='Inbox'):
        state = self.client.select_folder(folder.encode(), readonly=True)
        # result = self.client.search('UNSEEN')
        result = self.client.search('NOT DELETED')
        print(result)
        # download
        msgdict = self.client.fetch(result, ['RFC822'])
        for message_id, message in msgdict.items():
            message_contents = message[b'RFC822'].decode('utf-8')
            e = email.message_from_string(message_contents)
            # print(e)
            self.walk(e)
        pass

    def list(self):
        folders = self.client.list_folders()
        for f in folders:
            name = f[2]
            if name == 'pinture':
                self.has_pinture = True
            print(f)
            pass
        print(folders)

    def initPinture(self):
        self.list()
        if self.has_pinture:
            # todo upload all local images
            self.select('pinture')
            pass
        else:
            self.client.create_folder('pinture')
        pass

    def walk(self, email):
        # walk through individual mails, looking for attachment of JPG type
        info = None
        for part in email.walk():
            if part.is_multipart():
                continue
            # if part.get_content_type() == 'text/plain':
            #     body = "\n" + part.get_payload() + "\n"
            if part.get('Content-ID') == 'info':
                info = part.get_payload()
                className = str(Img).replace('<class \'', '').replace('\'>', '')
                info = info[:-1] + ',"py/object":"' + className + '"}'
                img = jsonpickle.decode(info)
                print(img)
                self.walkingImg = img
                continue
                # download the attachments from email to the designated directory
            if part.get_content_maintype() == 'image':
                att_path = os.path.join('dl', self.walkingImg.name)
                # Check if its already there
                if not os.path.isfile(att_path):
                    fp = open(att_path, 'wb')
                    temp = part.get_payload(decode=True)
                    fp.write(temp)
                    fp.close()




    # p2 = PhP2()
    # p2.login(acPixtch, pwPixtch)
    # p2.select()
    # p = PhP()
    # p.upload()
    # p.login(acPixtch, pwPixtch)
    # print(p.response)
    # p.get_attachments()

    def uploadImg(self, img):
        msg = MIMEMultipart()
        msg['From'] = 'Pinture'
        msg['Subject'] = "[Pinture]" + img.name

        msgText = MIMEText('<img src="cid:%s" width="%spx" height="%spx">' % (img.hash, img.width, img.height), 'html')
        # todo text css
        msg.attach(msgText)

        msgInfo = MIMEText(img.info)
        msgInfo.add_header('Content-ID', 'info')
        msgInfo.add_header('Content-Disposition', 'attachment', filename='info')
        msg.attach(msgInfo)

        img.fp.seek(0)
        msgImg = MIMEImage(img.fp.read())
        msgImg.add_header('Content-ID', img.hash)  # text 显示使用cid
        msgImg.add_header('Content-Disposition', 'attachment', filename=img.name)
        msg.attach(msgImg)
        try:
            s = smtplib.SMTP(host=self.SMTP_SERVER['host'], port=self.SMTP_SERVER['port'])
            s.ehlo()
            s.starttls()
            s.ehlo()
            lret = s.login(self.smtp_ac, self.smtp_pw)
            for addr in self.rev_addrs:
                print('send to', addr)
                msg['To'] = addr
                ret = s.sendmail(self.smtp_ac, addr, msg.as_string())
                print(ret)
            s.quit()
        except Exception as e:
            print('send failed!', e)
        pass


from urllib.request import urlretrieve
import urllib
from utils.md5 import md5_bytes


def download(url):
    user_agent = 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1870.2 Safari/537.36'
    headers = {'User-Agent': user_agent, "X-Requested-With": "XMLHttpRequest"}
    req = urllib.request.Request(url, headers=headers)
    res = urllib.request.urlopen(req)
    if res.status == 200:
        if not os.path.exists(PIN_PATH):
            os.makedirs(PIN_PATH)
        img_bytes = res.read()
        md5_str = md5_bytes(img_bytes)
        save_file_path = os.path.join(PIN_PATH, md5_str)
        if os.path.exists(save_file_path):
            print('存在:', save_file_path)
        f = open(save_file_path, 'wb')
        f.write(img_bytes)
        f.close()

    def _retrieve(url, filename, count=0):
        if count > 10:
            print('失败: 重试过10 次')
        try:
            if urlretrieve(url, filename):
                print("下载:" + filename)
            else:
                print('失败:', filename)
        except:
            count += 1
            print('ContentTooShortError: retry')
            _retrieve(url, filename, count)
            pass

            # _retrieve(url, saveFilePath)


            # url = 'http://www.indiginus.com/sitebuilder/images/AGC_Remix_scr-422x243.jpg'
            # download(url)