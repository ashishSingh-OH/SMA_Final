class Post < ApplicationRecord

  validates :title, presence: true, allow_blank:false
  validates :description, presence: true, allow_blank:false, length: { minimum: 5 , maximum: 100}
  # has_one_attached :image
  belongs_to :user
  has_many :comments,:dependent =>:destroy
  has_many :post_likes,:dependent =>:destroy
  


end
