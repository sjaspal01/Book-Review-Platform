from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Book, Review
from .serializers import BookSerializer, ReviewSerializer
from django.shortcuts import get_object_or_404

class BookListAPIView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        author = self.request.query_params.get('author', None)
        genre = self.request.query_params.get('genre', None)
        published_date = self.request.query_params.get('published_date', None)

        if author:
            queryset = queryset.filter(author__icontains=author)
        if genre:
            queryset = queryset.filter(genre__icontains=genre)
        if published_date:
            queryset = queryset.filter(published_date=published_date)

        return queryset

class BookReviewListAPIView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        book_id = self.kwargs['id']
        return Review.objects.filter(book_id=book_id)

class AddReviewAPIView(generics.CreateAPIView):
    serializer_class = ReviewSerializer

    def post(self, request, *args, **kwargs):
        book_id = self.kwargs['id']
        book = get_object_or_404(Book, id=book_id)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(book=book)  
            return Response({"message": "Review added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)