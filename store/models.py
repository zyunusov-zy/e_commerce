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
    description = CKEditor5Field('Text', config_name='extends')
    
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True, verbose_name="Selling Price")
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
        
class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000, verbose_name="Variant Name", null=True, blank=True)
    
    def item(self):
        return VariantItem.objects.filter(variant=self)
    
    def __str__(self):
        return self.name
    
class VariantItem(models.Model):
    variant = models.ForeignKey(Variant, on_delete=models.CASCADE, related_name="variant_items")
    title = models.CharField(max_length=1000, verbose_name="Variant Item Name", null=True, blank=True)
    content = models.CharField(max_length=1000, verbose_name="Variant Item Content", null=True, blank=True)
    
    def __str__(self):
        return self.title
    
class Gallery(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    image = models.FileField(upload_to="product/gallery/", null=True, blank=True)
    gallery_id = models.CharField(
        max_length=50,
        unique=True,
        default=lambda: f"{''.join(shortuuid.ShortUUID().random(length=5, alphabet='1234567890'))}"
    )
    
    def __str__(self):
        return f"{self.product.title} - image"
    
class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True, blank=True)
    qty = models.PositiveIntegerField(default=0, null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    sub_total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    shipping = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    tax = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    size = models.CharField(max_length=100, null=True, blank=True)
    color = models.CharField(max_length=100, null=True, blank=True)
    cart_id = models.CharField(max_length=1000, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.cart_id} - {self.product.title}"
    
    class Meta:
        ordering = ['-date']
        
class Coupon(models.Model):
    vendor = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True)
    code = models.CharField(max_length=100)
    discount = models.IntegerField(default=1)
    
    def __str__(self):
        return self.code
    
class Order(models.Model):
    vendor = models.ManyToManyField(user_models.User, blank=True)
    customer = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True, blank=True, related_name="customer")
    sub_total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    shipping = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    tax = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    service_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    payment_status = models.CharField(max_length=100, choices=PAYMENT_STATUS, default='Processing')
    payment_method = models.CharField(max_length=100, choices=PAYMENT_METHOD, default=None, null=True, blank=True)
    order_status = models.CharField(max_length=100, choices=ORDER_STATUS, default='Pending')
    initial_total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True, help_text="Initial Total Before Discount")
    saved = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True, help_text="Saved Amount")
    # address = models.ForeignKey("customer.Address", on_delete=models.SET_NULL, null=True, blank=True)
    coupons = models.ManyToManyField(Coupon, blank=True)
    order_id =  models.CharField(
        max_length=25,
        unique=True,
        default=lambda: f"{''.join(shortuuid.ShortUUID().random(length=5, alphabet='1234567890'))}"
    )
    
    payment_id = models.CharField(max_length=1000, null=True, blank=True)
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.customer.username} - {self.id}"
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = "Order"
    
    def order_items(self):
        return OrderItem.objects.filter(order=self)
        
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    order_status = models.CharField(max_length=100, choices=ORDER_STATUS, default='Pending')
    shipping_service = models.CharField(max_length=100, choices=SHIPPING_SERVICE, default=None, null=True, blank=True)
    tracking_id = models.CharField(max_length=100, null=True, blank=True, default=None)
    
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    qty = models.PositiveIntegerField(default=0)
    color = models.CharField(max_length=100, null=True, blank=True)
    size = models.CharField(max_length=100, null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    sub_total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    shipping = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    tax = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True)
    initial_total = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True, help_text="Initial Total Before Discount")
    saved = models.DecimalField(max_digits=12, decimal_places=2, default=0.00, null=True, blank=True, help_text="Saved Amount")
    coupon = models.ManyToManyField(Coupon, blank=True)
    applied_coupon = models.BooleanField(default=False)
    item_id = models.CharField(
        max_length=25,
        unique=True,
        default=lambda: f"{''.join(shortuuid.ShortUUID().random(length=5, alphabet='1234567890'))}"
    )
    vendor = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True, related_name="vendor_order_items")
    date = models.DateTimeField(default=timezone.now)
    
    def item_id(self):
        return f"{self.order.order_id}"
    
    def __str__(self):
        return self.item_id
    
    class Meta:
        ordering = ['-id']
        
class Review(models.Model):
    user = models.ForeignKey(user_models.User, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True, related_name="product_reviews")
    review = models.TextField(null=True, blank=True)
    reply = models.TextField(null=True, blank=True)
    rating = models.IntegerField(choices=RATING, default=0)
    active = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return f"{self.user.username} review on  {self.product.title}"

        