from django.db import models


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