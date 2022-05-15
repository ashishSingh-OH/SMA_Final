class PostSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers

   attributes :id,:title, :description, :user_id

  # def image
  #   if object.image.attached?
  #     {
  #       url: rails_blob_url(object.image)
  #     }
  #   end
  # end
end
