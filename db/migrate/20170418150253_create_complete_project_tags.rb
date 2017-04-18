class CreateCompleteProjectTags < ActiveRecord::Migration[5.0]
	def change
    create_table :project_tags do |t|
    	t.integer :project_id
      t.integer :tag_id

      t.timestamps
    end
	end

  def self.down
    drop_table :project_tags
  end

end
