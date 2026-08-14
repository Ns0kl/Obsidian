from django.urls import path
from .views import GrammarCorrectionView

app_name = 'proofreading'
urlpatterns = [
    path('grammar_correction', GrammarCorrectionView.as_view(), name="grammar_correction"),
]
