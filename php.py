#!/usr/bin/env python
# encoding=utf8

import struct
import imghdr
import semidbm


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
import smtplib
import imaplib
import re
import os
import email

pattern_uid = re.compile('\d+ \(UID (?P<uid>\d+)\)')

from imapclient import IMAPClient


# class PhP():
# def __init__(self):
# self.IMAP_SERVER = 'imap-mail.outlook.com'
# self.IMAP_PORT = 993
# self.M = None
# self.response = None
# self.mailboxes = []
#
# def login(self, username, password):
# self.M = imaplib.IMAP4_SSL(self.IMAP_SERVER, self.IMAP_PORT)
# rc, self.response = self.M.login(username, password)
# return rc
#
#     def logout(self):
#         self.M.logout()
#
#     def get_mailboxes(self):
#         rc, self.response = self.M.list()
#         for item in self.response:
#             self.mailboxes.append(item.split()[-1])
#         return rc
#
#     def create_mailbox(self, mailbox):
#         rc, self.response = self.M.create(mailbox)
#         return rc
#
#     def parse_uid(self, data):
#         match = pattern_uid.match(data)
#         return match.group('uid')
#
#     def get_attachments(self, folder='Inbox'):
#         name_pat = re.compile('name=\".*\"')
#         self.M.select(folder)
#         subjectSearch = "Whiteboard Image -- Application in progress --"
#         resp, data = self.M.search(None, '(UNSEEN SUBJECT "%s")' % subjectSearch)
#
#         counter = 0
#         detach_dir = '.'
#
#         for num in data[0].split():
#             resp, data = self.M.fetch(num, '(RFC822)')
#             mail = email.message_from_string(data[0][1])
#             # self.M.store(num, '+FLAGS', r'(\Deleted)')
#             # walk through individual mails, looking for attachment of JPG type
#             for part in mail.walk():
#                 if part.is_multipart():
#                     continue
#                 if part.get_content_type() == 'text/plain':
#                     body = "\n" + part.get_payload() + "\n"
#
#                 if part.get_content_maintype() != 'image':
#                     continue
#
#                 file_type = part.get_content_type().split('/')[1]
#
#                 if not file_type:
#                     file_type = 'jpg'
#
#                 filename = part.get_filename()
#
#                 if not filename:
#                     filename = name_pat.findall(part.get('Content-Type'))[0][6:-1]
#
#                 print(filename)
#
#                 # PARSING BODY OF EMAIL
#                 destFolder = albumHeader = ' '
#                 if body:
#                     word_list = body.split()
#                     for i in range(len(word_list)):
#                         if word_list[i] == 'DestFolder:':
#                             tmpWord = word_list[i].split(":")
#                             destFolder = tmpWord[1]
#                         elif word_list[i] == 'AlbumHeader:':
#                             tmpWord = word_list[i].split(":")
#                             folderFlag = word_list[i]
#
#
#                 # download the attachments from email to the designated directory
#                 att_path = os.path.join(detach_dir, filename)
#
#                 # Check if its already there
#                 if not os.path.isfile(att_path):
#                     fp = open(att_path, 'wb')
#                     temp = part.get_payload(decode=True)
#                     fp.write(temp)
#                     fp.close()
#
#                 cmd = "chmod -R 755 ."
#                 os.system(cmd)
#
#                 counter = counter + 1
#

#
#
# def rev():
#     # you want to connect to a server; specify which server
#     server = imaplib.IMAP4_SSL('imap-mail.outlook.com')
#     # after connecting, tell the server who you are
#     server.login(acPixtch, pwPixtch)
#     # this will show you a list of available folders
#     # possibly your Inbox is called INBOX, but check the list of mailboxes
#     code, mailboxen = server.list()
#     print(mailboxen)
#     # if it's called INBOX, then…
#     server.select("Inbox")
#     pass

class Img():
    def __init__(self):
        self.name = ''
        self.date = 0
        self.tags = []
        self.ref = ''
        self.width = 0
        self.height = 0
        self.size = 0
        pass


class PhP2():
    def __init__(self):
        self.IMAP_SERVER = 'imap-mail.outlook.com'
        self.IMAP_PORT = 993
        self.client = IMAPClient(host=self.IMAP_SERVER, ssl=True)
        self.ac = ''
        self.pw = ''
        self._isLogin = False
        if debug_view:
            self._isLogin = True
        pass

    def upload(self):
        img_width, img_height = get_image_size('y.png')
        msg = MIMEMultipart()
        msg['From'] = self.ac
        msg['To'] = self.ac
        msg['Subject'] = "test2"
        # msgText = MIMEText('<b>%s</b><br><img src="cid:bob.jpg"><br>' % body, 'html')
        msgText = MIMEText('<img src="cid:y.jpg" width="%spx" height="%spx">' % (img_width, img_height), 'html')
        msg.attach(msgText)  # Added, and edited the previous line

        attachment = 'y.jpg'
        fp = open(attachment, 'rb')
        img = MIMEImage(fp.read())
        fp.close()

        img.add_header('Content-ID', attachment)
        msg.attach(img)

        s = smtplib.SMTP("smtp.live.com", 587)
        s.ehlo()
        s.starttls()
        s.ehlo()
        s.login(acPixtch, pwPixtch)
        s.sendmail(acPixtch, acPixtch, msg.as_string())
        s.quit()
        pass

    def login(self, username, password):
        self.ac = username
        self.pw = password
        ret = self.client.login(username, password)
        print(ret)
        if ret[-12:] == b'successfully':
            self._isLogin = True
            pass
        pass

    def isLogin(self):
        return self._isLogin

    def select(self, folder='Inbox'):
        state = self.client.select_folder(folder, readonly=True)
        # result = self.client.search('UNSEEN')
        result = self.client.search('NOT DELETED')
        # download
        # msgdict = self.client.fetch(result, ['RFC822'])
        # for message_id, message in msgdict.items():
        # message_contents = message[b'RFC822'].decode('utf-8')
        # e = email.message_from_string(message_contents)
        # print(e)
        #     self.walk(e)
        pass

    def walk(self, email):
        # walk through individual mails, looking for attachment of JPG type
        for part in email.walk():
            if part.is_multipart():
                continue
            if part.get_content_type() == 'text/plain':
                body = "\n" + part.get_payload() + "\n"
            if part.get_content_maintype() != 'image':
                continue
            # file_type = part.get_content_type().split('/')[1]
            #
            # if not file_type:
            # file_type = 'jpg'
            filename = part.get('Content-ID')
            print(filename)
            # download the attachments from email to the designated directory
            att_path = os.path.join('dl', filename)
            # Check if its already there
            if not os.path.isfile(att_path):
                fp = open(att_path, 'wb')
                temp = part.get_payload(decode=True)
                fp.write(temp)
                fp.close()

    pass


    # p2 = PhP2()
    # p2.login(acPixtch, pwPixtch)
    # p2.select()
    # p = PhP()
    # p.upload()
    # p.login(acPixtch, pwPixtch)
    # print(p.response)
    # p.get_attachments()