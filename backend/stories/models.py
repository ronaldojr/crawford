from django.db import models
from PIL import Image, ImageDraw, ImageOps, ImageFont
from backend.settings import BASE_DIR
import textwrap
import re, os


class Categorie(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.name

    
class Storie(models.Model):
    cover = models.ImageField(upload_to="covers/", blank=True, null=True)
    title = models.CharField(max_length=250, blank=False, null=False)
    intro = models.TextField(max_length=200, blank=False, null=False)
    storie = models.TextField(blank=False, null=False)
    categorie = models.ForeignKey('Categorie', on_delete=models.SET_NULL, null=True)
    author = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class AccessLogger(models.Model):
    ACCESS_TYPE_CHOICES = [('v', 'VIEW'), ('D', 'DOWNLOAD'),]
    storie = models.ForeignKey('Storie', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    type = models.CharField(max_length=1, choices=ACCESS_TYPE_CHOICES)


class ImageGenerator:

    def __init__(self, story):

        self.path_font = os.path.join(BASE_DIR, 'stories/arial.ttf')
        self.story = story
        self.font_regular = ""
        self.author_name = ""
        self.font_title = ""
        self.list_paragraphs = []
        self.image = ""
        self.draw = ""
        self.text = ""
        self.size = ""
        self.h = 30
        self.bordered = ""

    def set_up(self):

        self.font_regular = ImageFont.truetype(self.path_font, 12)
        self.font_title = ImageFont.truetype(self.path_font, 15)
        self.create_text()
        self.size = (500,(len(self.text) * 18) + 80)
        self.image = Image.new('RGBA', self.size, '#ffffff')
        self.draw = ImageDraw.Draw(self.image)
        self.author_name = self.get_author_name()
        self.make_image()


    def get_author_name(self):
        return self.story.author.first_name + " " + self.story.author.last_name

    def get_list_paragraphs(self):
        return self.story.storie.split('\r\n\r\n')

    def get_intro(self):
        return textwrap.wrap(self.story.intro, width=80)

    def set_line_break(self):
        return ['<#break#>']

    def create_text(self):
        self.text = self.get_intro()
        self.text += self.set_line_break()
        self.list_paragraphs = self.get_list_paragraphs()

        for p in self.list_paragraphs:
            self.text += textwrap.wrap(p, width=80)
            self.text += self.set_line_break()

    def create_border(self):
        self.bordered = ImageOps.expand(self.image, border=10, fill='#eee')

    def make_image(self):
        self.draw.text(
            (30, self.h), 
            self.story.title, 
            font=self.font_title, 
            fill='black'
        )

        self.h +=30 

        for line in self.text:
            if line.find("<#break#>") != -1:
                self.draw.text((30, self.h), " ", fill='black')
                self.h += 15
            else:
                self.draw.text(
                    (30, self.h), 
                    line, 
                    font=self.font_regular, 
                    fill='black'
                )
            self.h += 15

        self.draw.text(
            (30, self.h+20), 
            "Author: " +  self.author_name, 
            font=self.font_regular, 
            fill='black'
        )

        del self.draw

        self.create_border()

    def wrap_response(self, response):
        self.bordered.save(response, 'PNG')


            






