

# from ..expedientes import expedientes

# from django.views.generic.edit import CreateView
# from django.urls import reverse_lazy


# from ..models import Document


# # Create your views here.


# class UploadView(CreateView):
#     model = Document
#     fields = ['upload_file', ]
#     success_url = reverse_lazy('fileupload')

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['documents'] = Document.objects.all()
#         return context
