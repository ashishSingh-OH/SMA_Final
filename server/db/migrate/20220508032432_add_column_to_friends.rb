class AddColumnToFriends < ActiveRecord::Migration[5.2]
  def change

    add_column :friends , :block , :boolean ,:default => false
    
  end
end
