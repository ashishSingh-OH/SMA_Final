class FriendRequestSerializer < ActiveModel::Serializer
  attributes :id, :friend_id
  has_one :user
end
