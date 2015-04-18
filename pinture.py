__author__ = 'toramisu'

import os

from php import Img

from random import randint


class Pinture():
    def __init__(self):
        self.imagePath = os.path.normpath('dl/')
        self.images = []
        self.updateImage()
        pass

    def updateImage(self):
        self.images = []
        for root, dirs, files in os.walk(self.imagePath):
            for filespath in files:
                filename = os.path.join(root, filespath).replace('\\', '/')
                img = Img()
                img.path = filename
                img.refPath = filename.replace(self.imagePath, '')
                img.createMeta(filename)
                self.images.append(img)
                print('[load img]: ', filename)
        pass

    def getPage(self, count):
        imgs = []
        for idx in range(0, len(self.images)):
            if idx < count:
                imgs.append(self.images[idx])
                pass
            else:
                break
        while len(imgs) < count:
            rIdx = randint(0, len(self.images) - 1)
            imgs.append(self.images[rIdx])
            pass
        return imgs