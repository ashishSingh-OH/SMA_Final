class ChatSerializer < ActiveModel::Serializer
  attributes :id, :friend_id, :message
  has_one :user
end
