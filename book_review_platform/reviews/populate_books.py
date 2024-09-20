from django.core.management.base import BaseCommand
from reviews.models import Book
from datetime import date
import random

class Command(BaseCommand):
    help = 'Populates the database with 10 sample books'

    def handle(self, *args, **kwargs):
        if Book.objects.count() == 0:  
            self.stdout.write('Populating database with sample books...')
            self.add_books()
        else:
            self.stdout.write('Database already populated with books.')

    def add_books(self):
        books = [
            {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "published_date": date(1925, 4, 10)},
            {"title": "1984", "author": "George Orwell", "genre": "Dystopian", "published_date": date(1949, 6, 8)},
            {"title": "To Kill a Mockingbird", "author": "Harper Lee", "genre": "Fiction", "published_date": date(1960, 7, 11)},
            {"title": "Pride and Prejudice", "author": "Jane Austen", "genre": "Romance", "published_date": date(1813, 1, 28)},
            {"title": "The Catcher in the Rye", "author": "J.D. Salinger", "genre": "Fiction", "published_date": date(1951, 7, 16)},
            {"title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "Fantasy", "published_date": date(1937, 9, 21)},
            {"title": "Moby-Dick", "author": "Herman Melville", "genre": "Adventure", "published_date": date(1851, 10, 18)},
            {"title": "War and Peace", "author": "Leo Tolstoy", "genre": "Historical", "published_date": date(1869, 1, 1)},
            {"title": "The Odyssey", "author": "Homer", "genre": "Epic", "published_date": date(-700, 1, 1)},
            {"title": "Brave New World", "author": "Aldous Huxley", "genre": "Dystopian", "published_date": date(1932, 8, 18)},
        ]

        random.shuffle(books)
        for book_data in books:
            Book.objects.create(**book_data)
        self.stdout.write('Books added successfully.')
