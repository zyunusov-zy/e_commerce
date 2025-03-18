from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    username = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        if not self.username:
            name, _ = self.email.split('@')
            self.username = name
        super().save(*args, **kwargs)
        
USER_TYPE = [
    ("vendor", "Vendor"),
    ("customer", "Customer"),
]

class Profile(models.Model):
    user= models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default='default-user.jpg', upload_to='profile_pics')
    full_name = models.CharField(max_length=255, null=True, blank=True)
    mobile = models.CharField(max_length=255, null=True, blank=True)
    user_type = models.CharField(max_length=255, choices=None, null=True, blank=True, default=None)
    
    def __str__(self):
        return f'{self.user.username} Profile'
    
    def save(self, *args, **kwargs):
        if not self.full_name:
            self.full_name = self.user.username
        super().save(*args, **kwargs)
    