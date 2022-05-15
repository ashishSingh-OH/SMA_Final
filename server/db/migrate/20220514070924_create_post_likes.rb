class CreatePostLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :post_likes do |t|
      t.integer :post_id, :null => false,:unique => true
      t.integer :user_id, :null => false,:unique => true
      t.timestamps
    end
  end
end
