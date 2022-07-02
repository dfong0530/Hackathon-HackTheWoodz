from django.urls import path, re_path
from .views import CustomAuthToken, ProjectViewSet, UserViewSet

urlpatterns = [
    path('delete_all_projects/', ProjectViewSet.as_view({'delete':'delete_all_projects'})),
    path('flush_database/', ProjectViewSet.as_view({'delete':'flush_database'})),
    path('projects/', ProjectViewSet.as_view({'get':'projects'})),
    path('create/', ProjectViewSet.as_view({'post':'create'})),
    path('update/', ProjectViewSet.as_view({'post':'update'})),
    path('delete_project/', ProjectViewSet.as_view({'post':'delete_project'})),
    re_path(r'^view_project/(?:title-(?P<title>\w+)/)?$', ProjectViewSet.as_view({'get':'view_project'})),
    re_path(r'^get_thumbnail/(?:title-(?P<title>\w+)/)?$', ProjectViewSet.as_view({'get':'get_thumbnail'})),
    path('log_in/', CustomAuthToken.as_view()),
    path('log_out/', UserViewSet.as_view({'delete':'log_out'})),
    path('users/', UserViewSet.as_view({'get':'users'})),
    re_path(r'^profile/(?:username-(?P<username>\w+)/)?$', UserViewSet.as_view({'get':'profile'})),
    path('create_account/', UserViewSet.as_view({'post':'create_account'})),
]
