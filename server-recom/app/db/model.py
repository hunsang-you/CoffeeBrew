from .models.Bean import Bean, Bean_detail, Bean_score
from .models.Capsule import Capsule, Capsule_detail, Capsule_score
from .models.Member import Member, Review, LikeList


class Model:
    def __getitem__(self, key):
        return getattr(self, key)

    def __setitem__(self, key, value):
        return setattr(self, key, value)

    Bean = Bean
    Bean_detail = Bean_detail
    Bean_score = Bean_score

    Capsule = Capsule
    Capsule_detail = Capsule_detail
    Capsule_score = Capsule_score

    Member = Member
    Review = Review
    LikeList = LikeList
