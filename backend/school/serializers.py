from rest_framework import serializers
from .models import SchoolProfile, Staff, Achievement, Blog, Gallery

class SchoolProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolProfile
        fields = '__all__'

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['id', 'judul', 'keterangan', 'gambar']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['id', 'judul', 'tanggal', 'isi', 'gambar']

class GallerySerializer(serializers.ModelSerializer):
    gambar = serializers.SerializerMethodField()

    class Meta:
        model = Gallery
        fields = ['id', 'judul', 'gambar', 'tanggal']

    def get_gambar(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.gambar.url) if obj.gambar else None

