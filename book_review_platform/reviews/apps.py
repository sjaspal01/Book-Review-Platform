from django.apps import AppConfig

class ReviewsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'reviews'

    def ready(self):
        from django.db import connection
        if 'reviews_book' in connection.introspection.table_names():
            Book = self.get_model('Book')  
            Review = self.get_model('Review')
            if Book.objects.count() == 0:  
                self.add_books_and_reviews(Book, Review)

    def add_books_and_reviews(self, Book, Review):
        import random
        from datetime import date

        books = [
            {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "genre": "Fiction", "published_date": date(1925, 4, 10)},
            {"title": "1984", "author": "George Orwell", "genre": "Dystopian", "published_date": date(1949, 6, 8)},
            {"title": "To Kill a Mockingbird", "author": "Harper Lee", "genre": "Fiction", "published_date": date(1960, 7, 11)},
            {"title": "Pride and Prejudice", "author": "Jane Austen", "genre": "Romance", "published_date": date(1813, 1, 28)},
            {"title": "The Catcher in the Rye", "author": "J.D. Salinger", "genre": "Fiction", "published_date": date(1951, 7, 16)},
            {"title": "The Hobbit", "author": "J.R.R. Tolkien", "genre": "Fantasy", "published_date": date(1937, 9, 21)},
            {"title": "Moby-Dick", "author": "Herman Melville", "genre": "Adventure", "published_date": date(1851, 10, 18)},
            {"title": "War and Peace", "author": "Leo Tolstoy", "genre": "Historical", "published_date": date(1869, 1, 1)},
            {"title": "The Odyssey", "author": "Homer", "genre": "Epic", "published_date": date(1900, 1, 1)},
            {"title": "Brave New World", "author": "Aldous Huxley", "genre": "Dystopian", "published_date": date(1932, 8, 18)},
        ]

        reviews = [
            "An exceptional read with thought-provoking themes.",
            "A classic that everyone should experience at least once.",
            "A bit slow at times, but overall a fantastic book.",
            "Loved the characters and the intricate plot.",
            "A masterpiece in literature.",
            "Didn't live up to the hype, but still worth reading.",
            "Captivating and moving, a must-read.",
            "I struggled to get through this one, but it was rewarding in the end.",
            "A fascinating exploration of complex themes.",
            "This book will stay with me for a long time."
        ]

        random.shuffle(books)
        for book_data in books:
            book = Book.objects.create(**book_data)
            
            
            for i in range(random.randint(1, 2)):
                Review.objects.create(
                    book=book,
                    reviewer_name=f"Reviewer {i+1}",
                    review_text=random.choice(reviews),
                    rating=random.randint(3, 5)
                )
