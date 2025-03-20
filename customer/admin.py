from django.contrib import admin
from .models import Address, Notification, Wishlist
from import_export.admin import ImportExportModelAdmin
    
class AddressAdmin(ImportExportModelAdmin):
    list_display = ['user', 'full_name']
    
class WishlistAdmin(ImportExportModelAdmin):
    list_display = ['user', 'product']
    
class NotificationAdmin(ImportExportModelAdmin):
    list_display = ['user', 'type', 'seen', 'date']


admin.site.register(Address, AddressAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Wishlist, WishlistAdmin)
