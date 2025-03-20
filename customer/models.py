from django.db import models

# Create your models here.
from store.models import Product
from userauths.models import User

TYPE = (
    ("New Order", "New Order"),
    ("Item Shipped", "Item Shipped"),
    ("Item Delivered", "Item Delivered"),
)

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="wishlist_products")
    
    class Meta:
        verbose_name_plural = "Wishlist"
    
    def __str__(self):
        if self.product.title:
            return self.product.title
        else:
            return "Wishlist"
        
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    full_name = models.CharField(max_length=255, null=True, blank=True, default=None)
    mobile = models.CharField(max_length=255, null=True, blank=True, default=None)
    email = models.CharField(max_length=100,null=True, blank=True, default=None)
    country = models.CharField(max_length=255, null=True, blank=True, default=None)
    state = models.CharField(max_length=255, null=True, blank=True, default=None)
    city = models.CharField(max_length=255, null=True, blank=True, default=None)
    address = models.TextField(null=True, blank=True, default=None)
    zip_code = models.CharField(max_length=255, null=True, blank=True, default=None)
    
    class Meta:
        verbose_name_plural = "Customer Address"
    
    def __str__(self):
        return self.full_name
    
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    type = models.CharField(max_length=255, null=True, blank=True, choices=TYPE)
    seen = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Notification"
        
    def __str__(self):
        return self.type
    






