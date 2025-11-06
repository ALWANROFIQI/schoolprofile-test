from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SchoolProfileViewSet, StaffViewSet, AchievementViewSet, BlogViewSet, GalleryViewSet

router = DefaultRouter()
router.register('profiles', SchoolProfileViewSet)
router.register('staff', StaffViewSet)
router.register('achievements', AchievementViewSet)
router.register('blogs', BlogViewSet)
router.register('galeri', GalleryViewSet)

urlpatterns = [
    path('', include(router.urls))
]
