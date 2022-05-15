class Comment < ApplicationRecord
  
  validates :body, presence: true,allow_blank:false
  validates :post_id, presence:true;
  validates :user_id, presence:true;
  belongs_to :post
  belongs_to :user
  belongs_to  :parent_comment, class_name: 'Comment', optional: true
  has_many    :replies, class_name: 'Comment', foreign_key: :parent_comment_id, dependent: :destroy
  


end
