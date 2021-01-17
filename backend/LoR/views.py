from django.shortcuts import render
from .models import (
    Office,
    Rank,
    Card,
    Deck,
    RelDeck,
    Page,
    Character,
    Guide,
    RelGuide,
    AbnoCards,
)
from rest_framework import generics
from .serializers import (
    DeckSerializers,
    CardSerializers,
    AbnoSerializers,
    OfficeSerializer,
    DeckListSerializer,
    # UserSerializer
)
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly


def HomePage(request):
    return render(request, "LoR/LoRHomePage.html")


class CardSingle(generics.RetrieveAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializers


class CardList(generics.ListAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializers


class DeckList(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Deck.objects.all().order_by("-id")
    serializer_class = DeckListSerializer


class DeckSingle(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    ]
    queryset = Deck.objects.all()
    serializer_class = DeckSerializers


class AbnoList(generics.ListAPIView):
    queryset = AbnoCards.objects.all()
    serializer_class = AbnoSerializers


class OfficeList(generics.ListAPIView):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer
