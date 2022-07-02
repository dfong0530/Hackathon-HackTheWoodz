from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action, permission_classes

from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import ProjectSerializer, UserSerializer
from .models import Project, Person
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from django.http import HttpResponseRedirect

# This class allows us to add more fields in the response
# when a user logs in. By default, only the token is returned
class CustomAuthToken(ObtainAuthToken):

    # This function allows us to include first_name, job_title
    # in the Response when a user logs into their account
    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)

            display = {
                'token': token.key,
                'first_name': user.first_name,
                'job_title': user.person.job_title
            }

            return Response(display, status=status.HTTP_200_OK)

        return Response({"status":"bad request"}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # display all users (only useful for testing)
    @action(detail=False, methods=['get'])
    def users(self, request):
        users = User.objects.all()

        display = []

        for user in users:

            if user.is_superuser:
                continue

            job_title = user.person.job_title

            user_info = {
                "id": user.id,
                "first_name": user.first_name,
                "job_title": job_title,
                "username": user.username,
                "email": user.email,
            }

            display.append(user_info)

        return Response(display, status=status.HTTP_200_OK)

    @action(detail=False, methods=['delete'], permission_classes=[IsAuthenticated])
    def log_out(self, request):
        request.user.auth_token.delete()
        return Response({"status":"sucessfully logged out"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def create_account(self, request):
        serializer = UserSerializer(data=request.data)

        # this line is required before acessing serialized data
        if serializer.is_valid():

            # skim thru request data and make sure it has a
            # name, job_title, username, email, and password field

            req_first_name = serializer.validated_data.get('first_name')
            try:
                job_title = request.data['job_title']
            except:
                return Response({"status":"required fields missing"}, status=status.HTTP_400_BAD_REQUEST)

            req_username = serializer.validated_data.get('username')
            req_email = serializer.validated_data.get('email')
            req_password = serializer.validated_data.get('password')

            # check that these fields are not None
            if req_first_name and req_username and req_email and req_password:

                # create new user using request data
                first_name = serializer.validated_data['first_name']
                username = serializer.validated_data['username']
                email = serializer.validated_data['email']
                password = serializer.validated_data['password']

                user = User.objects.create_user(
                        first_name=first_name,
                        username=username,
                        email=email,
                        password=password
                    )

                person = Person.objects.create(
                        user=user,
                        job_title=job_title
                )

                return Response({"status":"user successfully created"}, status=status.HTTP_200_OK)

            return Response({"status":"required fields missing"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"status":"bad request"}, status=status.HTTP_400_BAD_REQUEST)

    # display all projects by a specific user (username: <username>)
    @action(detail=False, methods=['get'])
    def profile(self, request):
        parameters = request.GET
        num_parameters = len(request.GET)

        if num_parameters != 1:
            return Response({"status":"incorrect number of arguments"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                username = parameters['username']
                user = get_object_or_404(User, username=username)
                projects = Project.objects.filter(user=user)

                display = []

                for project in projects:
                    project_info = {
                        "id": project.id,
                        "thumbnail": "/media/" + str(project.thumbnail),
                        "title": project.title,
                        "short_description": project.short_description
                    }

                    display.append(project_info)

                return Response(display, status=status.HTTP_200_OK)
            except:
                return Response({"status":"bad request"}, status=status.HTTP_400_BAD_REQUEST)


# unathenticated users may only perform GET requests
# other request types only be allowed if authenticated

#@permission_classes([IsAuthenticatedOrReadOnly])
@permission_classes([AllowAny]) # auth thru request body
class ProjectViewSet(ModelViewSet):

    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    @action(detail=False, methods=['delete'])
    def delete_all_projects(self, request):

        # Authentication verification thru request body rather than tokens
        #-----------------------------------------------------------------
        try:
            username = request.data['username']
            password = request.data['password']
            user = authenticate(username=username, password=password)
            if user == None:
                return Response({"error":"incorrect authentication"}, status=status.HTTP_400_BAD_REQUEST)
            elif user.is_superuser == False:
                return Response({"error":"you do not have permission to perform this action"}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({"status":"username or password is missing"}, status=status.HTTP_400_BAD_REQUEST)
        #-----------------------------------------------------------------
        projects = Project.objects.all()

        for project in projects:
            project.delete()

        return Response({"status":"all projects deleted"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['delete'])
    def flush_database(self, request):

        # Authentication verification thru request body rather than tokens
        #-----------------------------------------------------------------
        try:
            username = request.data['username']
            password = request.data['password']
            user = authenticate(username=username, password=password)
            if user == None:
                return Response({"error":"incorrect authentication"}, status=status.HTTP_400_BAD_REQUEST)
            elif user.is_superuser == False:
                return Response({"error":"you do not have permission to perform this action"}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({"status":"username or password is missing"}, status=status.HTTP_400_BAD_REQUEST)
        #-----------------------------------------------------------------

        users = User.objects.all()
        projects = Project.objects.all()

        for project in projects:
            project.delete()

        for user in users:
            if user.is_superuser == False:
                user.delete()

        return Response({"status":"successfully flushed database"}, status=status.HTTP_200_OK)

    # display all projects in database (for testing)
    @action(detail=False, methods=['get'])
    def projects(self, request):
        projects = Project.objects.all()

        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Example Request:
# http://127.0.0.1:8000/projectmanager/params/?title=Abby's First Project
    @action(detail=False, methods=['get'])
    def view_project(self, request):
        parameters = request.GET
        num_parameters = len(request.GET)

        if num_parameters != 1:
            return Response({"status":"incorrect number of arguments"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                title = parameters['title']
                project = get_object_or_404(Project, title=title)
                display = {
                    "long_description": project.long_description,
                    "contributions": project.contributions
                }
                return Response(display, status=status.HTTP_200_OK)
            except:
                return Response({"status":"bad request"}, status=status.HTTP_400_BAD_REQUEST)

    # create a new project
    @action(detail=True, methods=['post'])#, permission_classes=[AllowAny])
    def create(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():

# Authentication verification thru request body rather than tokens
#-----------------------------------------------------------------
            try:
                username = request.data['username']
                password = request.data['password']
                user = authenticate(username=username, password=password)
                if user == None:
                    return Response({"error":"incorrect authentication"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"status":"username or password is missing"}, status=status.HTTP_400_BAD_REQUEST)
#-----------------------------------------------------------------
            #project.user = request.user

            project = Project()
            project.user = user

            if serializer.initial_data.get('title'):
                title_data = serializer.validated_data['title']

                # check if project with that title alreadu exists
                already_exists = Project.objects.filter(title=title_data)

                if already_exists:
                    return Response({"error":"project with that title already exists"}, status=status.HTTP_409_CONFLICT)

            # confirm that the request has the following fields
            req_title = serializer.validated_data.get('title')
            req_contributions = serializer.validated_data.get('contributions')
            req_long_desc = serializer.validated_data.get('long_description')
            req_short_desc = serializer.validated_data.get('short_description')
            req_thumbnail = serializer.validated_data.get('thumbnail')

            # if the request had all four fields filled out, create
            # the new project using the data from the request
            if req_title and req_contributions and req_long_desc and req_short_desc and req_thumbnail:
                project.title = serializer.validated_data['title']
                project.contributions = serializer.validated_data['contributions']
                project.long_description = serializer.validated_data['long_description']
                project.short_description = serializer.validated_data['short_description']
                project.thumbnail = serializer.validated_data['thumbnail']

                project.save()
                return Response({"status":"successfully created project"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error":"required fields missing"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # update field(s) for a project
    @action(detail=False, methods=['patch'])
    def update(self, request):
        serializer = ProjectSerializer(data=request.data, partial=True)

        if serializer.is_valid():

    # Authentication verification thru request body rather than tokens
    #-----------------------------------------------------------------
            try:
                username = request.data['username']
                password = request.data['password']
                user = authenticate(username=username, password=password)
                if user == None:
                    return Response({"error":"incorrect authentication"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"status":"username or password is missing"}, status=status.HTTP_400_BAD_REQUEST)
    #-----------------------------------------------------------------

            # look for project by title
            if serializer.initial_data.get('title'):
                title_data = serializer.validated_data['title']
                project = get_object_or_404(Project, title=title_data)
            else:
                return Response({"error":"project not found"}, status=status.HTTP_404_NOT_FOUND)

            # check if user sending the request is the owner of the project
            if project.user == user: #request.user: (Token auth)

                # update anything that's changed been changed in request body
                if serializer.data.get('contributions'):
                    project.contributions = serializer.validated_data['contributions']

                if serializer.data.get('long_description'):
                    project.long_description = serializer.validated_data['long_description']

                if serializer.data.get('short_description'):
                    project.short_description = serializer.validated_data['short_description']

                if serializer.validated_data.get('thumbnail'):
                    project.thumbnail = serializer.validated_data['thumbnail']

                project.save()
                return Response({"status":"sucessfully updated project"}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"error":"you don't have permission"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error":"bad request"}, status=status.HTTP_400_BAD_REQUEST)

    #@action(detail=True, methods=['delete'])
# this method was changed to POST so the request
# information can be sent in the body of the request
    @action(detail=True, methods=['post'])
    def delete_project(self, request):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():

    # Authentication verification thru request body rather than tokens
    #-----------------------------------------------------------------
            try:
                username = request.data['username']
                password = request.data['password']
                user = authenticate(username=username, password=password)
                if user == None:
                    return Response({"error":"incorrect authentication"}, status=status.HTTP_400_BAD_REQUEST)
            except:
                    return Response({"status":"username or password is missing"}, status=status.HTTP_400_BAD_REQUEST)
    #-----------------------------------------------------------------

            if serializer.initial_data.get('title'):
                title_data = serializer.validated_data['title']
                project = get_object_or_404(Project, title=title_data)

                # for Token auth
            #    if request.user == project.user:
                project.delete()
                return Response({"status":"project successfully deleted"}, status=status.HTTP_200_OK)
            #    else:
            #        return Response({"error":"you don't have permission to delete this project"}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({"error":"project not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error":"bad request"}, status=status.HTTP_400_BAD_REQUEST)


# returns a link to the path
    @action(detail=False, methods=['get'])
    def get_thumbnail(self, request):
        parameters = request.GET
        num_parameters = len(request.GET)

        if num_parameters != 1:
            return Response({"status":"incorrect number of arguments"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                title = parameters['title']
                project = get_object_or_404(Project, title=title)
                img = "/media/" + str(project.thumbnail)
                return Response({"thumbnail":img}, status=status.HTTP_200_OK)
        #        return HttpResponseRedirect(img)
            except:
                return Response({"status":"bad request"}, status=status.HTTP_400_BAD_REQUEST)
