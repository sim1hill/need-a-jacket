class Weather < ActiveRecord::Migration
  def change
    create_table :weathers do |t|
    t.string :location
    t.integer :temperature
  end
  end
end
