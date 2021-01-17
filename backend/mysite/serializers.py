from rest_framework import serializers
from LoR.models import Deck
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    decks = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Deck.objects.all()
    )

    class Meta:
        model = User
        fields = ["id", "username", "decks"]
