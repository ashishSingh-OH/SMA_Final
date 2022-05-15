class AddUserNameColumnToCommentTable < ActiveRecord::Migration[5.2]
  def change

    add_column :comments, :user_name,:string, presence: true,allow_blank:false

  end
end
