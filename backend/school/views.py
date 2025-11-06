from rest_framework import viewsets
from .models import SchoolProfile, Staff, Achievement, Blog, Gallery
from .serializers import SchoolProfileSerializer, StaffSerializer, AchievementSerializer, BlogSerializer, GallerySerializer


class SchoolProfileViewSet(viewsets.ModelViewSet):
    queryset = SchoolProfile.objects.all()
    serializer_class = SchoolProfileSerializer

class StaffViewSet(viewsets.ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer

class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-tanggal')
    serializer_class = BlogSerializer

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all().order_by('-tanggal')
    serializer_class = GallerySerializer

