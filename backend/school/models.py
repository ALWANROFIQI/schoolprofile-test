from django.db import models

class SchoolProfile(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    description = models.TextField(blank=True)
    established = models.DateField(null=True, blank=True)

class Student(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    nis = models.CharField(max_length=50, unique=True)
    classroom = models.CharField(max_length=100, blank=True)
    birthdate = models.DateField(null=True, blank=True)

class Staff(models.Model):
    name = models.CharField(max_length=150)
    position = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)

class Announcement(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    published_at = models.DateTimeField(auto_now_add=True)

class Achievement(models.Model):
    judul = models.CharField(max_length=255)
    keterangan = models.TextField()
    gambar = models.ImageField(upload_to='achievements/', null=True, blank=True)

class Blog(models.Model):
    judul = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    tanggal = models.DateField(auto_now_add=True)
    isi = models.TextField()
    gambar = models.ImageField(upload_to='blogs/', null=True, blank=True)

    def __str__(self):
        return self.judul