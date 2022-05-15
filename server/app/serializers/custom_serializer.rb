class CustomSerializer < ActiveModel::Serializer
  attributes :comment_id, :post_id, :user_info
end
