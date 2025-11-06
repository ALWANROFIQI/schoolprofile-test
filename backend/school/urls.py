from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SchoolProfileViewSet, StudentViewSet, StaffViewSet, AnnouncementViewSet,  AchievementViewSet, BlogViewSet

router = DefaultRouter()
router.register('profiles', SchoolProfileViewSet)
router.register('students', StudentViewSet)
router.register('staff', StaffViewSet)
router.register('announcements', AnnouncementViewSet)
router.register('achievements', AchievementViewSet)
router.register('blogs', BlogViewSet)

urlpatterns = [
    path('', include(router.urls))
]
