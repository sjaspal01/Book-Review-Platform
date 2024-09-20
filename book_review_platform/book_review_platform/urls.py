from django.contrib import admin
from django.urls import path
from reviews.views import BookListAPIView, BookReviewListAPIView, AddReviewAPIView

urlpatterns = [
    path('books', BookListAPIView.as_view(), name='book-list'),
    path('books/<int:id>/reviews', BookReviewListAPIView.as_view(), name='book-reviews'),
    path('books/<int:id>/review/add', AddReviewAPIView.as_view(), name='add-review'),
]
