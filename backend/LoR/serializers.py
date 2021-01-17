from rest_framework import serializers
from LoR.models import Deck, Card, RelDeck, AbnoCards, Office
# from django.contrib.auth.models import User


class OfficeSerializer(serializers.ModelSerializer):
    Rank = serializers.StringRelatedField()

    class Meta:
        model = Office
        fields = ["Name", "id", "ImgPath", "Rank"]


class CardDeckSerializers(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ["Name", "ImgPath"]


class CardCountSerializers(serializers.ModelSerializer):
    card_id = serializers.StringRelatedField(read_only=True)
    card_images = serializers.CharField(source="*", read_only=True)

    class Meta:
        model = RelDeck
        fields = ["card_count", "card_id", "card_images"]


class DeckSerializers(serializers.ModelSerializer):
    card_count = serializers.SerializerMethodField()
    cards = CardDeckSerializers(many=True, read_only=True)
    effect = serializers.StringRelatedField(many=True, read_only=True)
    Recc_Floor = serializers.StringRelatedField(read_only=True)
    Recc_Page = serializers.StringRelatedField(read_only=True)
    Recc_Rank = serializers.StringRelatedField(read_only=True)
    creator = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Deck
        fields = "__all__"

    def get_card_count(self, instance):
        reldecks = instance.reldeck_set.all().order_by("card_id")
        return CardCountSerializers(reldecks, many=True).data


class CardSerializers(serializers.ModelSerializer):
    office = OfficeSerializer(read_only=True)
    Rarity = serializers.SerializerMethodField()
    Type1 = serializers.SerializerMethodField()
    Type2 = serializers.SerializerMethodField()
    Type3 = serializers.SerializerMethodField()
    Type4 = serializers.SerializerMethodField()

    class Meta:
        model = Card
        fields = "__all__"

    def get_Rarity(self, obj):
        return obj.get_Rarity_display()

    def get_Type1(self, obj):
        return obj.get_Type1_display()

    def get_Type2(self, obj):
        return obj.get_Type2_display()

    def get_Type3(self, obj):
        return obj.get_Type3_display()

    def get_Type4(self, obj):
        return obj.get_Type4_display()


class AbnoSerializers(serializers.ModelSerializer):
    office = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = AbnoCards
        fields = "__all__"


class DeckListSerializer(serializers.ModelSerializer):
    creator = serializers.StringRelatedField()
    Recc_Rank = serializers.StringRelatedField()

    class Meta:
        model = Deck
        fields = ["id", "name", "creator", "Recc_Rank"]


# class UserSerializer(serializers.ModelSerializer):
#     decks = serializers.PrimaryKeyRelatedField(
#         many=True, queryset=Deck.objects.all()
#     )

#     class Meta:
#         model = User
#         fields = ["id", "username", "decks"]
