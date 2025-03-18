from django.db import models
from shortuuidfield import ShortUUIDField
from django.utils import timezone
from django.utils.text import slugify
from django_ckeditor_5.fields import CKEditor5Field

from userauths import models as user_models

import shortuuid

STATUS = (
    ('Published', 'Published'),
    ('Draft', 'Draft'),
    ('Archived', 'Archived'),
)

PAYMENT_STATUS = (
    ('Paid', 'Paid'),
    ('Pending', 'Pending'),
    ('Failed', 'Failed'),
)

PAYMENT_METHOD = (
    ('PayPal', 'PayPal'),
    ('Stripe', 'Stripe'),
    ('Flutterwave', 'Flutterwave'),
    ('Paystack', 'Paystack'),
    ('RazorPay', 'RazorPay'),
)

ORDER_STATUS = (
    ('Pending', 'Pending'),
    ('Processing', 'Processing'),
    ('Shipped', 'Shipped'),
    ('Fulfilled', 'Fulfilled'),
    ('Cancelled', 'Cancelled'),
)

SHIPPING_SERVICE = (
    ('FedEx', 'FedEx'),
    ('UPS', 'UPS'),
    ('DHL', 'DHL'),
    ('USPS', 'USPS'),
)

RATING = (
    (1, '⭐☆☆☆☆'),
    (2, '⭐⭐☆☆☆'),
    (3, '⭐⭐⭐☆☆'),
    (4, '⭐️⭐️⭐️⭐️☆'),
    (5, '⭐️⭐️⭐️⭐️⭐️'),
)

class Category(models.Model):
    title = models.CharField(max_length=255)
    image = models.FileField(upload_to="category/", null=True, blank=True)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['title']
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
        
class Product(models.Model):
    title = models.CharField(max_length=255)
    image = models.FileField(upload_to="product/", null=True, blank=True)
    # description = models.TextField()
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, verbose_name="Selling Price")
    regular_price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, verbose_name="Regular Price")
    
    stock = models.PositiveIntegerField(default=0, null=True, blank=True)
    shipping = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, verbose_name="Shipping Cost")
    
    status = models.CharField(max_length=50, choices=STATUS, default='Published')
    featured = models.BooleanField(default=False, verbose_name="Marketplace Featured")
    
    vendor = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True, blank=True)
    
    sku = models.CharField(
        max_length=50,
        unique=True,
        default=lambda: f"SKU{''.join(shortuuid.ShortUUID().random(length=5, alphabet='1234567890'))}"
    )
    slug = models.SlugField(null=True, blank=True)
    
    date = models.DateTimeField(default=timezone.now)
    
    class Meta:
        verbose_name_plural = "Products"
        ordering = ['-id']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title) + "-" + str(shortuuid.uuid().lower()[:2])
        super().save(*args, **kwargs)
        
