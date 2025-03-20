from django.db import models
from shortuuidfield import ShortUUIDField
from userauths.models import User
from store.models import OrderItem
from django.utils.text import slugify


NOTIFICATION_TYPE = (
    ("New Order", "New Order"),
    ("New Review", "New Review"),
)

PAYOUT_METHOD = (
    ("Paypal", "Paypal"),
    ("Stripe", "Stripe"),
)

TYPE = (
    ("New Order", "New Order"),
    ("Item Shipped", "Item Shipped"),
    ("Item Delivered", "Item Delivered"),
)

def generate_id():
    su = shortuuid.ShortUUID()
    su.set_alphabet('1234567890') 
    return f"{su.random(length=6)}"


class Vendor(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="vendor")
    image = models.FileField(upload_to="vendor/",blank=True)
    store_name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    vendor_id = ShortUUIDField(max_length=20, unique=True, default=generate_id)
    date = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, null=True, blank=True)
    
    def __str__(self):
        return self.store_name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.store_name)
        super().save(*args, **kwargs)

class Payout(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name="payouts")
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    payout_id = ShortUUIDField(max_length=10, unique=True, default=generate_id)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.payout_id
    
    class Meta:
        ordering = ['-date']
    
class BankAccount(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    account_type = models.CharField(max_length=50,choices=PAYOUT_METHOD, null=True, blank=True)
    
    bank_name = models.CharField(max_length=255)
    account_number = models.CharField(max_length=100)
    account_name = models.CharField(max_length=255)
    bank_code = models.CharField(max_length=100, null=True, blank=True)
    
    stripe_id = models.CharField(max_length=100, null=True, blank=True)
    paypal_address = models.CharField(max_length=100, null=True, blank=True)
    
    
    class Meta:
        verbose_name_plural = "Bank Account"
        
    def __str__(self):
        return self.bank_name
    
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="notifications_vendor")
    type = models.CharField(max_length=255, null=True, blank=True, choices=NOTIFICATION_TYPE)
    order = models.ForeignKey(OrderItem, on_delete=models.CASCADE, null=True, blank=True)
    seen = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.type
    
    class Meta:
        verbose_name_plural = "Notification"
        